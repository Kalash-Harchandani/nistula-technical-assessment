import axios from "axios";
import propertyContext from "../utils/propertyContext.js";

const generateAIReply = async (normalizedMessage) => {

  try {

    const prompt = `
You are an AI guest relations assistant for Nistula.

Property Context:
${propertyContext}

Guest Name:
${normalizedMessage.guest_name}

Guest Message:
${normalizedMessage.message_text}

Query Type:
${normalizedMessage.query_type}

Instructions:
- Be warm and professional
- Keep response concise
- Answer using provided property context only
`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          "x-api-key": process.env.CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        }
      }
    );

    return response.data.content[0].text;

  } catch (error) {

    console.log("Claude API Error:", error.response?.data || error.message);

    return "Our team will get back to you shortly.";
  }
};

export default generateAIReply;