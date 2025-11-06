import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { title, description, link } = await request.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create a prompt for summarizing the news
    const prompt = `You are a financial news analyst. Please provide a concise and informative summary of the following fintech news article in 3-4 sentences. Focus on the key points, impact, and significance.

Title: ${title}
Description: ${description}
Source URL: ${link}

Provide a clear, professional summary that highlights the most important aspects of this news.`;

    // Generate the summary
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
