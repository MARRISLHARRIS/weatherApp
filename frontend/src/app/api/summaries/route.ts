// src/app/api/summaries/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all weather summaries
    const response = await fetch(
      'http://localhost:5000/api/weather/weathersummaries'
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const summaries = await response.json(); // Parse the response as JSON
    console.log('Fetched Summaries:', summaries); // Log the fetched summaries

    // Check if summaries are empty
    if (!summaries || summaries.length === 0) {
      console.log('No summaries found in the database.');
    }

    return NextResponse.json(summaries); // Return the fetched summaries
  } catch (error) {
    console.error('Error fetching summaries:', error);
    return NextResponse.json(
      { message: 'Error fetching summaries', error: error.message },
      { status: 500 }
    );
  }
}
