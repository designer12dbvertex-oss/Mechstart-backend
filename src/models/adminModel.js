import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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
        resetPasswordToken: String,
        resetPasswordExpire: Date,
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("admin", adminSchema);
export default AdminModel;
