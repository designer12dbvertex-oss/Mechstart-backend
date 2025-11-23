import mongoose from "mongoose";

const scalingStrategySchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: false,
        }
    },
    { timestamps: true }
);

const ScalingStrategyModel = mongoose.model("scalingStrategy", scalingStrategySchema);
export default ScalingStrategyModel;
