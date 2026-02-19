import { NextResponse } from "next/server";
import OpenAI from "openai";
import { mockImages } from "@/lib/mock";

export async function POST(req: Request) {
  const body = (await req.json()) as { prompts: string[] };
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ images: mockImages, mode: "mock" });
  }

  const client = new OpenAI({ apiKey });
  const responses = await Promise.all(
    body.prompts.slice(0, 4).map((prompt) =>
      client.images.generate({ model: "gpt-image-1", prompt, size: "1024x1024" })
    )
  );

  const images = responses.map((res) => {
    const b64 = res.data?.[0]?.b64_json;
    return b64 ? `data:image/png;base64,${b64}` : mockImages[0];
  });

  return NextResponse.json({ images, mode: "live" });
}
