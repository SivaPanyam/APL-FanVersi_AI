import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateSportsInsight = async (context: string): Promise<string> => {
  const prompt = `
    You are the FanVerse AI Sports Assistant. 
    Analyze the following sports context and provide a concise, high-energy strategic insight.
    Focus on: Tactical adjustments, Key player performance, Predictive momentum.
    
    Context: ${context}
    
    Response format: A single paragraph, max 3-4 sentences. Use energetic sports terminology.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const chatWithAssistant = async (message: string, history: Content[] = [], matchContext?: string): Promise<string> => {
  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  const systemPrompt = matchContext 
    ? `Current Match Context: ${matchContext}. ` 
    : "";

  const fullPrompt = `${systemPrompt}User says: ${message}\n\nRespond as a knowledgeable, high-energy sports analyst. Keep it concise and engaging.`;

  const result = await chat.sendMessage(fullPrompt);
  const response = await result.response;
  return response.text();
};
