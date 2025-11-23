import mongoose from "mongoose";

const scalingSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const ScalingModel = mongoose.model("scaling", scalingSchema);
export default ScalingModel;
