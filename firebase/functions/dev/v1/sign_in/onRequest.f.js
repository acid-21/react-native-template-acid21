import * as functions from "firebase-functions";
import admin from "firebase-admin";
import cors from "cors";
import express from "express";

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.all("*", async (req, res) => {
  if (req.method !== "POST") {
    res.status(403).send("Forbidden!");
  }

  res.set("Content-Type", "application/json");
  const { email, password, confirm_password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);

    if (user) {
      return res
        .status(200)
        .send({ success: true, user: { email, token: user.uid } });
    } else {
      res.status(403).send("Forbidden! - User does not exist");
      return;
    }
  } catch (error) {
    if (user) {
      res.status(403).send("Forbidden! - User does not exist");
      return;
    }
  }
});

export default functions.https.onRequest(app);
