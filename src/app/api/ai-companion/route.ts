import { NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const completion = await generateText({
      model: openai('gpt-4o'),
      messages
    });

    return NextResponse.json({ message: { role: "assistant", content: completion.text } });
  } catch (error) {
    console.error("Error in AI Companion:", error);
    return NextResponse.error();
  }
}