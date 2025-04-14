/**
 * Utility functions for integrating with Google's Gemini API
 */

// Replace with your actual Gemini API key
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

/**
 * Sends a prompt to the Gemini API and returns the response
 * @param {string} prompt - The user's query
 * @returns {Promise<string>} - A promise that resolves to the Gemini response
 */
export const queryGeminiApi = async (prompt) => {
  try {
    // Create context about the application for better responses
    const contextPrompt = `
      You are an AI assistant for Final Fusion Translator, a modern language translation application.
      The app offers multiple translation modes: text-to-text, text-to-voice, voice-to-text, document translation, and image translation.
      It supports over 100 languages and has features like saving phrases, translation history, and a dark/light theme.
      The app was created by Ashwin, Ritesh, and Anshita, with Professor Shankar Madkar as their mentor.
      
      Answer the following question in a helpful, concise, and friendly manner:
      ${prompt}
    `;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: contextPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();
    
    // Check if the response has the expected structure
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected Gemini API response structure:", data);
      return "I'm having trouble connecting to my knowledge base. Let me try a different approach.";
    }
  } catch (error) {
    console.error("Error querying Gemini API:", error);
    return "I'm having trouble connecting to my knowledge base right now. Let me try a different approach.";
  }
};

/**
 * Fallback function that uses the Gemini API with error handling
 * @param {string} query - The user's query
 * @returns {Promise<string>} - A promise that resolves to the response
 */
export const getGeminiResponse = async (query) => {
  try {
    return await queryGeminiApi(query);
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    return "I'm having trouble connecting to my advanced knowledge base. Let me provide you with the information I have available.";
  }
};

export default getGeminiResponse;
