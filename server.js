import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import webhookRoutes from "./routes/webhookRoutes.js";
import loggerMiddleware from "./middlewares/loggerMiddleware.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use("/webhook", webhookRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});