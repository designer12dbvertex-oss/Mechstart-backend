import mongoose from "mongoose";

const consultingSchema = new mongoose.Schema(
    {
        description: {
            type: [String],
            required: false,
            trim: true,
        },
    },
    { timestamps: true }
);

const ConsultingModel = mongoose.model("consulting", consultingSchema);
export default ConsultingModel;
