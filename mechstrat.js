import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// const formRoute = require("./routes/inquiryRoute.js");
// const contactFormRoute = require("./routes/contactRoute.js");
// const growthFormRoute = require("./routes/growthRoute.js");

import formRoute from "./routes/inquiryRoute.js";
import contactFormRoute from "./routes/contactRoute.js";
import growthFormRoute from "./routes/growthRoute.js";
import connectDb from "./db/index.js";
import path from 'path'
import { fileURLToPath } from 'url'
import adminRouter from "./src/routes/adminRoutes.js";
import userRouter from "./src/routes/userRoutes.js";

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
connectDb()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/api/form", formRoute);
app.use("/api/form", contactFormRoute);
app.use("/api/form", growthFormRoute);
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)

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

