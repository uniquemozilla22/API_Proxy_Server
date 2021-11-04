const needle = require("needle");
const express = require("express");
const router = express.Router();
const url = require("url");
require("dotenv").config();

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_VALUE = process.env.API_KEY_VALUE;
const API_KEY_NAME = process.env.API_KEY_NAME;

router.get("/", async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });
    const apiRes = await needle("get", `${API_BASE_URL}?${params}`);
    const data = apiRes.body;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ ...err });
  }
});

module.exports = router;
