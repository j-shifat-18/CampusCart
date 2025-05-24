import express from "express";
import cors from "cors";
import { chatBot } from "./chatbot/chatbot.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const response = await chatBot("What is the best product for a student in college?");
        res.send(response);
  } catch (error) {
    // console.error(error);
        console.error(error);
        res.status(500).send('Error occurred');
        
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API Key: ${process.env.DEEPSEEK_API_KEY ? 'Loaded' : 'NOT loaded'}`);
});
