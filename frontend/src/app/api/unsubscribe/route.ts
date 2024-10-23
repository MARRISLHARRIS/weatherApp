import { NextResponse } from 'next/server';
import axios from 'axios';

// Handle DELETE requests to unsubscribe a user
export async function DELETE(req: Request) {
  try {
    // Get the user's email from the request's query parameters
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Send a request to the Express server to unsubscribe the user
    const response = await axios.delete(
      `http://backend:5000/api/user/unsubscribe/${email}`
      // `http://localhost:5000/api/user/unsubscribe/${email}`
    );

    // Return the response from the Express server
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
