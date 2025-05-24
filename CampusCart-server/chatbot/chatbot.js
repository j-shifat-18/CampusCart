import dotenv from 'dotenv';
import OpenAI from 'openai';
// const apikey = process.env.DEEPSEEK_API_KEY;
//const apikey="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";
//v2
const apikey="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";
//const apikey=process.env.V2;

// const apikey=process.env.DEEPSEEK_API_KEY;
console.log('APi key: ', apikey);


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