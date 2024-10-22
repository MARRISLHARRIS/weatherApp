import { NextResponse } from 'next/server';
import axios from 'axios';

// Handle GET requests to check if a user is subscribed
export async function GET(req: Request) {
  try {
    // Get the user's email from the request's query parameters
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    console.log(email);

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Send a request to the Express server to check the subscription status
    const response = await axios.get(
      `http://backend:5000/api/user/alerts/${email}`
    );
    console.log(response.data);

    // Return the subscription data
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
