import { Order } from "../models/order.mjs";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { RestaurantInfo } from "../models/restaurantInfo.mjs";
import { Design } from "../models/design.mjs";
import MarkdownIt from "markdown-it";
import { transporter } from "../utils/config/nodeMailer.mjs";
import * as dotenv from "dotenv";

dotenv.config();

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.API_KEY;

async function run(res) {
  try {
    const data = await Order.find();

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      {
        text: `Generate a comprehensive sales report for the current period, incorporating the findings from the data analysis and the predictions for the next month. Include visualizations such as charts or graphs to illustrate trends and provide a narrative summarizing key points. The report should cover areas such as product performance, customer trends, and any notable insights derived from the data analysis. Additionally, highlight the predicted sales figure for the next month and discuss the factors influencing this prediction. use this data set ${data}`,
      },
      { text: "input: " },
      { text: "output: " },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    const info = await RestaurantInfo.findById("65dd8f261068774295ad0098");
    const designInfo = await Design.findById("65d4ee4bb3e582b1c98ef387");
    const md = MarkdownIt();
    const markdownString = response.text();
    const htmlString = md.render(markdownString);
    const aiMail = {
      from: {
        name: designInfo.restaurantName,
        address: info.companyEmail,
      },
      to: "amilanwijesinghe01@gmail.com",
      subject: `AI-Generated Sales Report & Predictions - ${designInfo.restaurantName}`,
      text: `AI-Generated Sales Report & Predictions - ${designInfo.restaurantName}`,
      html: `<b> ${htmlString}</b>`,
    };

    transporter.sendMail(aiMail);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}

export const aiReport = async (req, res) => {
  try {
    await run(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
