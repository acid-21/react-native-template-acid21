import * as functions from "firebase-functions";
import admin from "firebase-admin";
import cors from "cors";
import express from "express";

let whitelist = [
  "http://localhost:3000",
  "https://react-most-wanted.com",
  "https://www.react-most-wanted.com",
];

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.all("*", async (req, res) => {
  functions.logger.info("API call", req.body);
  functions.logger.info("API method", req.method);
  functions.logger.info("API query", req.query);

  if (req.method !== "POST") {
    res.status(403).send("Forbidden!");
  }

  res.set("Content-Type", "application/json");
  const { email, password } = req.body;

  res.status(200).send({ success: true, email, password });
});

export default functions.https.onRequest(app);
