
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
    {
        // --- PART 1: Fields Yahan Aate Hain ---
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin"],
            default: "admin",
        },
        otp: {
            type: String,
            required: false
        },
        // Forgot Password fields
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        // --- PART 2: Settings (Options) Yahan Aate Hain ---
        timestamps: true,
        collection: 'admins' // <--- Ye line ab sahi jagah hai
    }
);

// Password encrypt karne ka logic (agar pehle se nahi hai)
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Token Generate karne ka method
adminSchema.methods.getResetPasswordToken = function () {
    // 1. Random token generate karein
    const resetToken = crypto.randomBytes(20).toString("hex");


    // 2. Token ko hash karke database me save karein (Security ke liye)
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // 3. Token ki expiry set karein (e.g., 10 minutes)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

// module.exports = mongoose.model("Adminforward", adminSchema);
const Adminforward = mongoose.model("Adminforward", adminSchema, "admins");
export default Adminforward;


// import mongoose from "mongoose";
// import crypto from "crypto";
// const bcrypt = require("bcryptjs");// <--- 1. Ye Import zaroori hai

// const adminSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: false,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["admin"],
//       default: "admin",
//     },
//     // <--- 2. Ye do fields add karein, warnaa token save nahi hoga
//     resetPasswordToken: String,
//     resetPasswordExpire: Date,
//   },
//   { timestamps: true }
// );

// // <--- 3. Ye Function add karein (Model create hone se PEHLE)
// adminSchema.methods.getResetPasswordToken = function () {
//   // Token generate
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hash karke DB me save karein
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // Expiry set karein (10 mins)
//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

// const Adminforward = mongoose.model("admin", adminSchema);
// export default Adminforward;