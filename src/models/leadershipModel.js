import mongoose from "mongoose";

const leadershipSchema = new mongoose.Schema(
    { banner: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
        image1: {
            type: String,
            required: true,
        },
        title1: {
            type: String,
            required: true,
        },
        subPoints1: {
            type: [String],
            required: true,
        },
        image2: {
            type: String,
            required: true,
        },
        title2: {
            type: String,
            required: true,
        },
        subPoints2: {
            type: [String],
            required: true,
        },
        functionDescription: {
            type: String,
            required: true,
        },
        functionImage: {
            type: String,
            required: true,
        },
        functionTitle: {
            type: String,
            required: true,
        },
        functionSubPoints: {
            type: [String],
            required: true,
        }

    },
    { timestamps: true }
);

const LeadershipModel = mongoose.model("leadership", leadershipSchema);
export default LeadershipModel;
