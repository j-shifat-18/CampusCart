import dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

const apikey = process.env.V5_DEEPSEEK;

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apikey,
});

const systemPrompt = `You are a helpful assistant for Campus Cart, a marketplace for students. Your role is to:
1. Help students find products and services they need
2. Provide information about buying and selling on the platform
3. Answer questions about campus life and student needs
4. Give recommendations based on student preferences
5. Help with any marketplace-related queries

Keep your responses concise, friendly, and focused on helping students with their marketplace needs.`;

async function chatBot(prompt) {
    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-prover-v2:free",
            messages: [
                {
                    "role": "system",
                    "content": systemPrompt
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        return completion.choices[0].message;
    } catch (error) {
        console.error('Chatbot error:', error);
        return {
            role: 'assistant',
            content: 'I apologize, but I encountered an error. Please try again in a moment.'
        };
    }
}

export { chatBot };