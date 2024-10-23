import { NextResponse } from 'next/server';
import axios from 'axios';

// Handle POST requests
export async function POST(req: Request) {
  try {
    const { email, temperatureUnit, alertThreshold } = await req.json();

    // Send data to the Express server running on localhost:5000
    const response = await axios.post(
      // 'http://localhost:5000/api/user/subscribe',
      'http://backend:5000/api/user/subscribe',
      {
        email,
        temperatureUnit,
        alertThreshold,
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
