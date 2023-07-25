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
  if (req.method !== "POST" && req.method !== "GET") {
    res.status(403).send("Forbidden!");
  }

  res.set("Content-Type", "application/json");

  const { token } = req.headers;
  functions.logger.log("token", token);

  try {
    const user = await admin.auth().getUser(token);

    if (user) {
      if (req.method === "GET") {
        const favoritesSnap = await admin
          .database()
          .ref(`favorites/${user.uid}`)
          .get();

        if (favoritesSnap.exists()) {
          res
            .status(200)
            .send({ success: true, favorites: favoritesSnap.val() });
        } else {
          res.status(200).send({ success: true, favorites: [] });
        }
      } else if (req.method === "POST") {
        const { name = "" } = req.body;
        const favoritesSnap = await admin
          .database()
          .ref(`favorites/${user.uid}`)
          .push({ name });

        res.status(200).send({ success: true });
      }

      return;
    } else {
      res.status(403).send("Forbidden! - User not authenticted");
      return;
    }
  } catch (error) {
    res.status(403).send("Forbidden! - User not authenticted");
    return;
  }
});

export default functions.https.onRequest(app);
