import { NextResponse } from 'next/server';

const EXPRESS_API_URL = process.env.EXPRESS_API_URL || 'http://127.0.0.1:5000/api';

export async function GET() {
  try {
    const res = await fetch(`${EXPRESS_API_URL}/groups`, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('[API Proxy] Error fetching groups from Express:', error.message);
    // Fallback static list if Express server is warming up
    return NextResponse.json({
      success: true,
      isFallback: true,
      groups: [
        {
          id: 'group1',
          number: 1,
          name: 'General Adults (18+)',
          title: 'The Resilience Continuum: Foundational Self-Care',
          duration: '52 Weeks • 10 Mins / Weekend',
          cadence: '1 Weekend Lesson per Week',
          cohortSize: 'Max 6 Adults / Room',
          badge: '52 Weeks',
          activeCohortCode: 'GROUP1-ROOM-01',
          availableSeats: 5,
          totalEnrolled: 1,
          focus: 'Emotional regulation, cognitive defusion, and healthy boundaries for lifelong mental wellness.'
        },
        {
          id: 'group2',
          number: 2,
          name: 'Parents & Caregivers',
          title: 'The Regulated Parent: Co-Regulation & Family Climate',
          duration: '52 Weeks • 10 Mins / Weekend',
          cadence: '1 Weekend Lesson per Week',
          cohortSize: 'Max 6 Parents / Room',
          badge: '52 Weeks',
          activeCohortCode: 'GROUP2-ROOM-01',
          availableSeats: 6,
          totalEnrolled: 0,
          focus: 'Parental self-regulation, emotion coaching for children, and calm family communication.'
        },
        {
          id: 'group3',
          number: 3,
          name: 'University & College Students (18+)',
          title: 'Academic Stress, Imposter Syndrome & Social Courage',
          duration: '4 Weeks • 10 Lessons Total',
          cadence: 'Week 1 Daily + Weeks 2–4 Weekend',
          cohortSize: 'Max 6 Students / Room',
          badge: '4 Weeks',
          activeCohortCode: 'GROUP3-ROOM-01',
          availableSeats: 6,
          totalEnrolled: 0,
          focus: 'Study panic de-escalation, imposter syndrome defusion, and campus life resilience.'
        },
        {
          id: 'group4',
          number: 4,
          name: 'Workplace Professionals',
          title: 'Corporate Burnout Recovery & Work-Life Boundaries',
          duration: '4 Weeks • 10 Lessons Total',
          cadence: 'Week 1 Daily + Weeks 2–4 Weekend',
          cohortSize: 'Max 6 Professionals / Room',
          badge: '4 Weeks',
          activeCohortCode: 'GROUP4-ROOM-01',
          availableSeats: 5,
          totalEnrolled: 1,
          focus: 'Corporate burnout recovery, asynchronous Slack/email firewalls, and guilt-free boundaries.'
        }
      ]
    });
  }
}
