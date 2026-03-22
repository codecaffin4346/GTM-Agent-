import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildSystemPrompt } from './src/knowledgeBase.js';
import dotenv from 'dotenv';
dotenv.config();

const MODELS = ['gemini-2.0-flash-lite', 'gemini-2.5-flash-lite', 'gemini-2.0-flash'];

async function testMode(mode, testPrompt) {
  console.log(`\n\n=== TESTING MODE: ${mode} ===`);
  console.log(`Prompt: "${testPrompt}"\n`);
  
  const apiKey = process.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const errors = [];
  for (const modelName of MODELS) {
    try {
      console.log(`Attempting model: ${modelName}...`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: buildSystemPrompt(mode),
      });
      const chat = model.startChat({ history: [] });
      const result = await chat.sendMessage(testPrompt);
      console.log(`✅ SUCCESS with ${modelName}:`);
      console.log(result.response.text());
      return;
    } catch (err) {
      errors.push(err.message);
      console.log(`❌ FAILED with ${modelName}: ${err.message.slice(0, 100)}`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  console.log(`\n❌ ALL MODELS FAILED. Errors:\n`, errors.join('\n'));
}

async function runAllTests() {
  await testMode('lead-scorer', 'Company: DataPulse, B2B SaaS, 80 employees, 6-person sales team using Slack + HubSpot + Notion. VP Sales is the decision maker. They struggle with repetitive outreach and manual reporting.');
  
  await testMode('outreach', 'Prospect: Alex Rivera, VP Sales at InsightLayer. They are a 40-person B2B SaaS company that just hit $1M ARR. Pain point: transitioning from inbound-only to outbound, no outreach automation.');
}

runAllTests();
