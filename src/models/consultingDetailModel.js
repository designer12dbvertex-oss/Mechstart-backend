import mongoose from "mongoose";

const consultingDeailSchema = new mongoose.Schema(
    {
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

const ConsultingDetailModel = mongoose.model("consultingDetail", consultingDeailSchema);
export default ConsultingDetailModel;
