const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const formRoute = require("./routes/inquiryRoute.js");
const contactFormRoute = require("./routes/contactRoute.js");
const growthFormRoute = require("./routes/growthRoute.js");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cors({
  origin: ["https://mechstrat.graphicsvolume.com"],
  methods: ["GET", "POST"]
}));

app.use(cors({ origin: "*" }));
app.get("/", (req, res) => {
  res.send("✅ I am backend! Server is running successfully.");
});

app.use("/api/inquiry-form", formRoute);
app.use("/api/contact-form", contactFormRoute);
app.use("/api/growth-form", growthFormRoute);

// app.use((err, req, res, next) => {
//   console.error(" Server error:", err);
//   res.status(500).json({ success: false, message: "Internal Server Error" });
// });
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || "dev"} on port ${PORT}`
  )
);
