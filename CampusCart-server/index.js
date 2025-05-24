import express from "express";
import cors from "cors";
import { chatBot } from "./chatbot/chatbot.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const response = await chatBot("What is the best product for a student in college?");
        res.send(response);
  } catch (error) {
    console.error(error);
        res.status(500).send('Error occurred');
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
