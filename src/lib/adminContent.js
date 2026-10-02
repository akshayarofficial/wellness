// Admin-panel data access for groups, weeks, classes and videos (RLS enforces admin access).
import { AdminAuthError, adminRpc, getSupabase } from './adminApi';
import { toGroupDto } from './groups';

const VIDEO_BUCKET = 'class-videos';
const SIGNED_URL_SECONDS = 60 * 60;

const ERROR_MESSAGES = {
  EG002: 'Room capacity cannot be changed once people have registered for this group.',
  23001: 'This group has registrations, so it cannot be deleted. Close or archive it instead.',
  23503: 'This group has registrations, so it cannot be deleted. Close or archive it instead.',
  23505: 'That week already exists in this group.',
};

// Resolves a Supabase response to its data, mapping failures to readable errors.
function unwrap({ data, error }) {
  if (!error) return data;
  if (error.code === '42501' || error.code === 'PGRST301' || error.code === 'PGRST303') {
    throw new AdminAuthError('You do not have access to the admin panel. Please sign in again.');
  }
  throw new Error(ERROR_MESSAGES[error.code] || error.message || 'Request failed.');
}

const bySortOrder = (a, b) => a.sort_order - b.sort_order || a.created_at.localeCompare(b.created_at);

// Exchanges the position of two rows. Rows always get a distinct sort_order when created.
async function swapSortOrder(table, a, b) {
  const supabase = getSupabase();
  unwrap(await supabase.from(table).update({ sort_order: b.sort_order }).eq('id', a.id));
  unwrap(await supabase.from(table).update({ sort_order: a.sort_order }).eq('id', b.id));
}

async function removeVideoFiles(paths) {
  if (paths.length === 0) return;
  // Best effort: the database rows are already gone, an orphaned file only costs storage.
  await getSupabase().storage.from(VIDEO_BUCKET).remove(paths).catch(() => {});
}

const uploadedPaths = (videos) => videos.filter((v) => v.source_type === 'upload').map((v) => v.storage_path);

// ---------- Groups ----------

export async function listGroups() {
  const rows = await adminRpc('admin_list_groups');
  return rows.map(toGroupDto);
}

function toGroupRow(fields) {
  return {
    name: fields.name.trim(),
    title: fields.title.trim(),
    audience: fields.audience.trim(),
    description: fields.focus.trim(),
    eligibility_notice: fields.eligibilityNotice.trim(),
    duration_weeks: Number(fields.durationWeeks),
    cadence: fields.cadence.trim(),
    room_capacity: Number(fields.roomCapacity),
    status: fields.status,
  };
}

export async function createGroup(fields, sortOrder) {
  unwrap(await getSupabase().from('groups').insert({ ...toGroupRow(fields), sort_order: sortOrder }));
}

export async function updateGroup(id, fields) {
  unwrap(await getSupabase().from('groups').update(toGroupRow(fields)).eq('id', id));
}

export async function swapGroups(a, b) {
  await swapSortOrder('groups', { id: a.id, sort_order: a.sortOrder }, { id: b.id, sort_order: b.sortOrder });
}

export async function deleteGroup(id) {
  const { weeks } = await loadCurriculum(id);
  const paths = uploadedPaths(weeks.flatMap((w) => w.classes.flatMap((c) => c.videos)));
  unwrap(await getSupabase().from('groups').delete().eq('id', id));
  await removeVideoFiles(paths);
}

// ---------- Curriculum: weeks → classes → videos ----------

// Returns { group, weeks } with classes and videos nested and sorted, or group: null if it does not exist.
export async function loadCurriculum(groupId) {
  const supabase = getSupabase();
  const [groupRow, weekRows] = await Promise.all([
    supabase.from('groups').select('*').eq('id', groupId).maybeSingle().then(unwrap),
    supabase.from('group_weeks').select('*, classes(*, class_videos(*))').eq('group_id', groupId).order('week_number').then(unwrap),
  ]);

  const weeks = weekRows.map(({ classes, ...week }) => ({
    ...week,
    classes: classes.sort(bySortOrder).map(({ class_videos: videos, ...cls }) => ({
      ...cls,
      videos: videos.sort(bySortOrder),
    })),
  }));
  return { group: groupRow ? toGroupDto(groupRow) : null, weeks };
}

export async function addWeeks(groupId, weekNumbers) {
  unwrap(await getSupabase().from('group_weeks').insert(weekNumbers.map((n) => ({ group_id: groupId, week_number: n }))));
}

export async function updateWeek(id, { title, releaseDate }) {
  unwrap(await getSupabase().from('group_weeks').update({ title: title.trim(), release_date: releaseDate || null }).eq('id', id));
}

export async function deleteWeek(week) {
  unwrap(await getSupabase().from('group_weeks').delete().eq('id', week.id));
  await removeVideoFiles(uploadedPaths(week.classes.flatMap((c) => c.videos)));
}

export async function createClass(weekId, { title, description }, sortOrder) {
  unwrap(await getSupabase().from('classes').insert({
    week_id: weekId, title: title.trim(), description: description.trim(), sort_order: sortOrder,
  }));
}

export async function updateClass(id, { title, description }) {
  unwrap(await getSupabase().from('classes').update({ title: title.trim(), description: description.trim() }).eq('id', id));
}

export async function setClassStatus(id, status) {
  unwrap(await getSupabase().from('classes').update({ status }).eq('id', id));
}

export async function swapClasses(a, b) {
  await swapSortOrder('classes', a, b);
}

export async function deleteClass(cls) {
  unwrap(await getSupabase().from('classes').delete().eq('id', cls.id));
  await removeVideoFiles(uploadedPaths(cls.videos));
}

// `source` is { file } for an upload or { url } for an external link.
export async function createVideo({ groupId, classId, title, source, durationSeconds, sortOrder }) {
  const supabase = getSupabase();
  const row = {
    class_id: classId,
    title: title.trim(),
    duration_seconds: durationSeconds ?? null,
    sort_order: sortOrder,
  };

  if (!source.file) {
    unwrap(await supabase.from('class_videos').insert({ ...row, source_type: 'link', url: source.url.trim() }));
    return;
  }

  const extension = source.file.name.includes('.') ? source.file.name.split('.').pop().toLowerCase() : 'mp4';
  const path = `${groupId}/${classId}/${crypto.randomUUID()}.${extension}`;
  const upload = await supabase.storage.from(VIDEO_BUCKET).upload(path, source.file, { contentType: source.file.type });
  if (upload.error) throw new Error(`Upload failed: ${upload.error.message}`);

  try {
    unwrap(await supabase.from('class_videos').insert({ ...row, source_type: 'upload', storage_path: path }));
  } catch (err) {
    await removeVideoFiles([path]);
    throw err;
  }
}

export async function renameVideo(id, title) {
  unwrap(await getSupabase().from('class_videos').update({ title: title.trim() }).eq('id', id));
}

export async function swapVideos(a, b) {
  await swapSortOrder('class_videos', a, b);
}

export async function deleteVideo(video) {
  unwrap(await getSupabase().from('class_videos').delete().eq('id', video.id));
  await removeVideoFiles(uploadedPaths([video]));
}

// A playable URL: a short-lived signed URL for uploads, the link itself otherwise.
export async function videoPlaybackUrl(video) {
  if (video.source_type === 'link') return video.url;
  const { data, error } = await getSupabase().storage.from(VIDEO_BUCKET).createSignedUrl(video.storage_path, SIGNED_URL_SECONDS);
  if (error) throw new Error(`Could not open the video: ${error.message}`);
  return data.signedUrl;
}
