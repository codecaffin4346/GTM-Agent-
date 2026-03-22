import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyBkgg33ACPp5XO_HNNhNV1rbMWnSXPusnM";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    console.log("AVAILABLE MODELS:");
    data.models.forEach(m => console.log(m.name, m.supportedGenerationMethods));
  } catch (e) {
    console.error("Error fetching models:", e);
  }
}

listModels();
