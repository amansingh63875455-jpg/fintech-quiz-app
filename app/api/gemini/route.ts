import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY;

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const result = await response.json();

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message || 'API Error' },
        { status: 400 }
      );
    }

    const output = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No data available.';
    return NextResponse.json({ text: output });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch from Gemini API' },
      { status: 500 }
    );
  }
}
