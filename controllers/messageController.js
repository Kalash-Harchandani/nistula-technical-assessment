import normalizeMessage from "../utils/normalizeMessage.js";
import classifyQuery from "../services/classifierService.js";
import generateAIReply from "../services/claudeService.js";

export const handleIncomingMessage = async (req, res) => {

  try {

    const payload = req.body;

    const normalizedMessage = normalizeMessage(payload);

    const queryType = classifyQuery(
      normalizedMessage.message_text
    );

    normalizedMessage.query_type = queryType;

    const draftedReply = await generateAIReply(
      normalizedMessage
    );

    return res.status(200).json({
      success: true,
      data: {
        ...normalizedMessage,
        drafted_reply: draftedReply
      }
    });

  } catch (error) {

    console.log("Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
};