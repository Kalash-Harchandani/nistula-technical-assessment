import fs from "fs";
import path from "path";

const loggerMiddleware = (req, res, next) => {

  const logPath = path.join("logs", "requests.log");

  const logData = `
[${new Date().toISOString()}]
${req.method} ${req.originalUrl}

Payload:
${JSON.stringify(req.body, null, 2)}

--------------------------------------------------

`;

  fs.appendFile(logPath, logData, (error) => {

    if (error) {
      console.log("Logging Error:", error);
    }

  });

  next();
};

export default loggerMiddleware;