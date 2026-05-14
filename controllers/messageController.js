import normalizeMessage from "../utils/normalizeMessage.js";
export const handleIncomingMessage = async (req, res) => {
  try {

    const payload = req.body;
    const normalizedMessage = normalizeMessage(payload);

    console.log("Normalized Message:", normalizedMessage);

    return res.status(200).json({
      success: true,
      data: normalizedMessage
    });

  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
};