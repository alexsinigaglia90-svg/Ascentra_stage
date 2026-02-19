import { NextResponse } from "next/server";
import OpenAI from "openai";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompt-builder";
import { mockReplies } from "@/lib/mock";

export async function POST(req: Request) {
  const body = (await req.json()) as { conversation: Array<{ role: "user" | "assistant"; content: string }> };
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      reply: mockReplies[Math.floor(Math.random() * mockReplies.length)],
      mode: "mock"
    });
  }

  const client = new OpenAI({ apiKey });
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: CHAT_SYSTEM_PROMPT }, ...body.conversation],
    temperature: 0.8
  });

  return NextResponse.json({ reply: completion.choices[0]?.message?.content || "Zullen we verdergaan?", mode: "live" });
}
