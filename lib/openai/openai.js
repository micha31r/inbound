import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a learning task based on a plaintext document.
 *
 * @param {string} documentText - The full text of the document.
 * @returns {Promise<Object>} - Structured JSON with learning tasks.
 */
async function generateLearningTask(documentText) {
  const prompt = `
  You are an AI assistant that creates structured learning tasks for users.
  Given a document, summarize it, provide learning objectives, and estimate the time needed.
  
  DOCUMENT TEXT:
  """${documentText}"""
  
  Format the output as a JSON object with the following structure:
  {
    "summary": "A brief summary of the document (max 3 sentences).",
    "learning_tasks": [
      {
        "task": "A specific learning action to understand the document better.",
        "estimated_time_minutes": 30
      },
      {
        "task": "Another task...",
        "estimated_time_minutes": 20
      }
    ]
  }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error generating learning task:", error);
    return null;
  }
}

// Example usage with a test document
const testDocument = `
Welcome to the company handbook. Our core values are integrity, innovation, and teamwork. 
All employees are expected to complete security training and understand company policies.
Quarterly meetings cover business strategy, and technical teams should review code guidelines. 
`;

generateLearningTask(testDocument).then((result) => {
  console.log("Generated Learning Plan:", result);
});

