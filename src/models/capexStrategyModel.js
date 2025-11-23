import mongoose from "mongoose";

const capexStrategySchema = new mongoose.Schema(
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
        },
    },
    { timestamps: true }
);

const CapexStrategyModel = mongoose.model("capexStrategy", capexStrategySchema);
export default CapexStrategyModel;
