import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all weather summaries using Axios
    const response = await axios.get(
      'http://backend:5000/api/weather/weathersummaries'
    );

    const summaries = response.data; // Axios automatically parses JSON
    console.log('Fetched Summaries:', summaries); // Log the fetched summaries

    // Check if summaries are empty
    if (!summaries || summaries.length === 0) {
      console.log('No summaries found in the database.');
    }

    return NextResponse.json(summaries); // Return the fetched summaries
  } catch (error) {
    console.error('Error fetching summaries:', error);
    return NextResponse.json(
      {
        message: 'Error fetching summaries',
        error: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
