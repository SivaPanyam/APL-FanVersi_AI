import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

export async function generateSportsInsight(context: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    const err = new Error("GEMINI_API_KEY is not configured on the server.");
    (err as { status?: number }).status = 503;
    throw err;
  }

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: MODEL });

  const prompt = `You are FanVerse AI, a concise second-screen sports analyst for engaged fans.
Rules:
- Keep under 120 words.
- No wagering instructions or promises of outcomes.
- Blend momentum, tactical nuance, and one fan-facing question to spark chat.

Context:
${context}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  if (!text?.trim()) {
    const err = new Error("Empty model response");
    (err as { status?: number }).status = 502;
    throw err;
  }
  return text.trim();
}
