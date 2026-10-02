import { NextResponse } from 'next/server';
import { createServiceClient } from '../../../lib/supabase/service';
import { parseRegistration } from '../../../lib/registrationValidation';
import { toRegistrationDto } from '../../../lib/registrationDto';
import { toGroupDto } from '../../../lib/groups';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Malformed JSON body.' }, { status: 400 });
  }

  const { errors, value } = parseRegistration(body);
  if (errors.length > 0) {
    return NextResponse.json({ success: false, error: errors[0], details: errors }, { status: 400 });
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.rpc('register_participant', {
      p_full_name: value.fullName,
      p_email: value.email,
      p_phone: value.phone,
      p_whatsapp_opt_in: value.whatsAppOptIn,
      p_group_id: value.groupId,
      p_time_slot: value.timeSlot,
      p_participation_style: value.participationStyle,
      p_primary_goal: value.primaryGoal,
      p_notes: value.notes,
    });

    if (error) {
      if (error.code === 'EG001') {
        return NextResponse.json(
          { success: false, error: 'This group is not open for registration. Please choose another group.' },
          { status: 400 }
        );
      }
      if (error.code === '23505') {
        // Don't echo the stored record back: anyone could look up a person's details by email.
        return NextResponse.json({
          success: false,
          error: 'This email is already registered for this group. Check your inbox for your confirmation details.',
        }, { status: 409 });
      }
      throw error;
    }

    const { data: groupRow } = await supabase.from('groups').select('*').eq('id', data.group_id).maybeSingle();
    const registration = toRegistrationDto(data, groupRow ? toGroupDto(groupRow) : undefined);
    return NextResponse.json({
      success: true,
      message: `Welcome ${registration.fullName}! You have been assigned to ${registration.groupName} (${registration.cohortCode}, Seat ${registration.seatNumber} of ${registration.maxRoomCapacity}).`,
      registration,
    }, { status: 201 });
  } catch (error) {
    console.error('[api/register] Registration failed:', error.message || error);
    return NextResponse.json(
      { success: false, error: 'Unable to complete your registration right now. Please try again in a moment.' },
      { status: 503 }
    );
  }
}
