import dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

const apikey=process.env.V5_DEEPSEEK;


const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apikey,
//   defaultHeaders: {
//     "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
//     "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
//   },
});


async function chatBot(prompt) {
    const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-prover-v2:free",
    messages: [
        {
        "role": "user",
        "content": prompt
        }
    ],
    
    });

    console.log(completion.choices[0].message);
    return completion.choices[0].message;
}

export {chatBot};