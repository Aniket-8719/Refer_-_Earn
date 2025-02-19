const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

// Config file
dotenv.config({ path: "./config/.env" });


// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes import
const referral = require("./routes/referralRoutes")

app.use("/api/v5", referral); 



module.exports = app;