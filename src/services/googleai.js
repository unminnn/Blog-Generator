import axios from "axios";

const GOOGLE_AI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const generateBlog = async (tone, length, topic) => {
  try {
    const response = await axios.post(
      `${GOOGLE_AI_API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Generate a blog post about "${topic}" with a tone of "${tone}" and a length of "${length}".`,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens:
            length === "short" ? 300 : length === "medium" ? 600 : 1200,
          temperature: 0.7,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the generated text from Google's response format
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating blog content:", error);
    throw error;
  }
};
