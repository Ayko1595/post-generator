const express = require("express");
const router = express.Router();

const config = require("../config");
const jwt = require("jsonwebtoken");

router.post("/auth", (req, res) => {
  const clientId = req.headers.authorization;

  const client = config["clientId"] === clientId ?? undefined;

  if (client) {
    const accessToken = jwt.sign({ client }, config["secret"], {
      ...config["claims"],
    });

    res.setHeader("Authorization", accessToken);

    res.json({
      message: "Token created.",
    });
  } else {
    res.status(401).json({
      message: "Unknown client.",
    });
  }
});

module.exports = router;
