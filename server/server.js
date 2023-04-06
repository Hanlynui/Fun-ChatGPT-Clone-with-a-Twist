import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openAI = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openAI.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});