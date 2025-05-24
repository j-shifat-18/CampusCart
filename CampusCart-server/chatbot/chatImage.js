import OpenAI from 'openai';

const apikey="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";
//const apikey=process.env.IMAGE;
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