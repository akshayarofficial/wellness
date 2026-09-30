import { NextResponse } from 'next/server';

const EXPRESS_API_URL = process.env.EXPRESS_API_URL || 'http://127.0.0.1:5000/api';

export async function POST(request) {
  try {
    const body = await request.json();

    // Forward request to Express backend
    const res = await fetch(`${EXPRESS_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('[API Proxy] Error connecting to Express backend:', error.message);
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to connect to the registration service. Please try again in a moment.',
      },
      { status: 503 }
    );
  }
}
