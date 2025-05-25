import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const apikey = process.env.V5_IMAGE;
if (!apikey) {
  console.error('V5_IMAGE API key is not set in environment variables');
}
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: apikey,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "CampusCart",
  },
});


async function searchBot(imageUrl, prompt) {
  try {
    if (!imageUrl) {
      throw new Error('Image required');
    }

    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-3-opus:beta",
      messages: [
        {
          "role": "system",
          "content": "You are a shopping assistant for CampusCart. Help students with their shopping journey. Try to be concise but resourceful"
        },
        {
          "role": "user",
          "content": [
            { "type": "image", "url": imageUrl },
          ]
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    if (!completion.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from AI model');
    }

    return {
      success: true,
      content: completion.choices[0].message.content
    };
  } catch (error) {
    console.error('Error in chatBotImage:', error);
    return {
      success: false,
      error: error.message || 'DO whatever you want, but I encountered an error processing the image.'
    };
  }
}

export { searchBot };