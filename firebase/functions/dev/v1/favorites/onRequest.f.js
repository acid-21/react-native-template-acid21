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
  if (
    req.method !== "POST" &&
    req.method !== "GET" &&
    req.method !== "DELETE"
  ) {
    res.status(403).send("Forbidden!");
  }

  res.set("Content-Type", "application/json");

  const { token } = req.headers;
  functions.logger.log("token", token);

  try {
    const user = await admin.auth().getUser(token);

    const getFavorites = async (userUid) => {
      const favoritesSnap = await admin
        .database()
        .ref(`favorites/${userUid}`)
        .get();

      if (favoritesSnap.exists()) {
        return favoritesSnap.val();
      } else {
        return {};
      }
    };

    if (user) {
      if (req.method === "GET") {
        const favorites = await getFavorites(user.uid);

        res.status(200).send({ success: true, favorites });
      } else if (req.method === "POST") {
        const { name = "" } = req.body;
        const favoritesSnap = await admin
          .database()
          .ref(`favorites/${user.uid}`)
          .push({ name });

        const favorites = await getFavorites(user.uid);
        res.status(200).send({ success: true, favorites });
      } else if (req.method === "DELETE") {
        let uid = req.query.uid || "none";
        functions.logger.log("req.query", req.query);
        functions.logger.log("uid", uid);
        const favoritesSnap = await admin
          .database()
          .ref(`favorites/${user.uid}/${uid}`)
          .set(null);

        const favorites = await getFavorites(user.uid);
        res.status(200).send({ success: true, favorites });
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
