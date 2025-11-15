const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const formRoute = require("./routes/inquiryRoute.js");
const contactFormRoute = require("./routes/contactRoute.js");
const growthFormRoute = require("./routes/growthRoute.js");
const app = express();
dotenv.config();
app.use(express.json());

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ["https://api.mechstreat.graphicsvolume.com"]
  : ["http://localhost:5000", "http://localhost:3001"];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  credentials: true
}));
  

// app.use("/api/form", formRoute);
app.use("/api", contactFormRoute);
// app.use("/api/form", growthFormRoute);

app.use((err, req, res, next) => {
  console.error(" Server error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log("pid", process.pid),
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV, process.pid  || "dev"} on port ${PORT}`
  )
);
