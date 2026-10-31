const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const optimizerRoutes = require("./routes/optimizerRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/optimizer", optimizerRoutes);
app.use("/api/analytics", analyticsRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});