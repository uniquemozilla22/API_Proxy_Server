const express = require("express");
require("dotenv").config();
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const port = process.env.PORT || 5000;

const app = express();
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
});
app.use(limiter);
app.set("trust proxy", 1);
app.use(cors());

app.use("/api", require("./routes/index.js"));

app.listen(port, () => console.log("http://localhost:" + port));
