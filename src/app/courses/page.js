import { redirect } from 'next/navigation';

// Courses page is fully removed; cleanly redirecting any direct hits to /tracks
export default function CoursesPage() {
  redirect('/tracks');
}
