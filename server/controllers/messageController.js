import normalizeMessage from "../utils/normalizeMessage.js";
import classifyQuery from "../services/classifierService.js";
import generateAIReply from "../services/claudeService.js";
import calculateConfidenceScore from "../services/confidenceService.js";
import determineAction from "../utils/determineAction.js";

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

    const confidenceScore =
    calculateConfidenceScore(
        normalizedMessage.query_type,
        draftedReply
    );

    const action = determineAction(
    confidenceScore,
    normalizedMessage.query_type
    );
    
    return res.status(200).json({
    message_id: normalizedMessage.message_id,

    query_type: normalizedMessage.query_type,

    drafted_reply: draftedReply,

    confidence_score: confidenceScore,

    action: action
    });

  } catch (error) {

    console.log("Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
};