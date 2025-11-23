import mongoose from "mongoose";

const capexSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const CapexModel = mongoose.model("capex", capexSchema);
export default CapexModel;
