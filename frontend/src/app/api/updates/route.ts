import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all weather updates using Axios
    const response = await axios.get(
      'http://backend:5000/api/weather/updates' // Update the endpoint to fetch weather updates
    );

    const updates = response.data; // Axios automatically parses JSON
    console.log('Fetched Updates:', updates); // Log the fetched updates

    // Check if updates are empty
    if (!updates || updates.length === 0) {
      console.log('No updates found in the database.');
    }

    return NextResponse.json(updates); // Return the fetched updates
  } catch (error) {
    console.error('Error fetching updates:', error);
    return NextResponse.json(
      {
        message: 'Error fetching updates',
        error: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
