const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const formRoute = require("./routes/inquiryRoute.js");
const contactFormRoute = require("./routes/contactRoute.js");
const growthFormRoute = require("./routes/growthRoute.js");


const app = express();
dotenv.config();

// ---------------------------------------------
// Middleware
// ---------------------------------------------
app.use(express.json());

// ---------------------------------------------
// CORS CONFIG (BEST & ERROR-FREE)
// ---------------------------------------------

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://mechstreat.graphicsvolume.com",
        "https://www.mechstreat.graphicsvolume.com",
        "https://api.mechstreat.graphicsvolume.com"
      ]
    : ["http://localhost:3000", "http://localhost:5010"];

// app.use(
//   cors({
//     origin: (origin, callback) => {
     
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) return callback(null, true);

//       console.log("❌ CORS Blocked:", origin);
//       return callback(new Error("Not allowed by CORS"));
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

app.use( cors({origin: "*"}));
// ---------------------------------------------
// Routes
// ---------------------------------------------
app.use("/api/form", formRoute);
app.use("/api/form", contactFormRoute);
app.use("/api/form", growthFormRoute);

// Root
app.get("/", (req, res) => {
  res.send("Mechstrat API is running!");
});

// ---------------------------------------------
// Error Handler
// ---------------------------------------------
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ---------------------------------------------
// Start Server
// ---------------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (${process.env.NODE_ENV || "dev"})`);
});
