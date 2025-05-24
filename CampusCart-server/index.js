import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import { chatBot } from "./chatbot/chatbot.js";


dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/chatbot', async (req, res) => {
  try {
    const response = await chatBot("What is the best product for a sophomore year student for his birthday?");
        res.send(response);
  } catch (error) {
    // console.error(error);
        console.error(error);
        res.status(500).send('Error occurred');
        
  }
})

app.get('/chatbotImage', async (req, res) => {
  try {
    const response = await chatBot("https://d1lfxha3ugu3d4.cloudfront.net/assets/system-images/made/assets/system-images/remote/https_d1lfxha3ugu3d4.cloudfront.net/exhibitions/images/2015_Sneaker_Culture_1._AJ_1_from_Nike_4000W.jpg_600_400.jpg","Suggest me some similar products");
        res.send(response);
  } catch (error) {
    // console.error(error);
        console.error(error);
        res.status(500).send('Error occurred');
        
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API Key: ${process.env.V3_DEEPSEEK ? 'Loaded' : 'NOT loaded'}`);
});
