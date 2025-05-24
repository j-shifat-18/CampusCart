import {
    GoogleGenAI,
    createUserContent,
    createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function chatbotImage(path) {
    const myfile = await ai.files.upload({
    filePath: path,
    config: { mimeType: "image/jpeg" },
    });

    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: createUserContent([
        createPartFromUri(myfile.uri, myfile.mimeType),
        "Analyse this product of the image, provide a brief description and pros and cons of buyying it, within 3 to 5 lines",
    ]),
    });
    console.log(response.text);
}

await chatbotImage();




async function chatBot(prompt) {
    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: createUserContent([prompt]), 
    config: {
      systemInstruction: "You are an assistant that helps users to find the best products for their needs. You should answer briefly and concisely",
    },
  });
  console.log(response.text);
}

await chatBot();


export {chatbotImage, chatBot};
// export default chatBot;
