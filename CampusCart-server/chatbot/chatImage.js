import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();


const apikey=process.env.V5_IMAGE;
console.log('DEEPSEEK_API_KEY:', apikey);

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apikey,
//   defaultHeaders: {
//     "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
//     "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
//   },
});

async function chatBotImage(imageUrl, prompt) {
  const completion = await openai.chat.completions.create({
    model: "google/gemma-3n-e4b-it:free",
    messages: [
      {
        "role": "user",
        "content": [
            {"type": "image", "url": imageUrl},
            {"type": "text", "text": prompt}
        ]
      }
    ],
    
  });

  console.log(completion.choices[0].message);
  return completion.choices[0].message;
}

export {chatBotImage};