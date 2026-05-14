export const handleIncomingMessage = async (req, res) => {
  try {

    const payload = req.body;

    console.log(payload);

    return res.status(200).json({
      success: true,
      message: "Webhook received successfully",
      data: payload
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
};