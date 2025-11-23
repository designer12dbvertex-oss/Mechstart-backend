import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
        },
        bannerTitle: {
            type: String,
            required: true,
        },
        bannerDescription: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
            trim: true,
        },
        aboutDescription: {
            type: [String],
            required: true,
        },
        visionDescription: {
            type: String,
            required: true,
        },
        coreTitle: {
            type: String,
            required: true,
        },
        coreItems: {
            type: [String],
            required: true,
        },
        coreImage: {
            type: String,
            required: true,
        },
        mechstratImage1: {
            type: String,
            required: true,
        },
        mechstratTitle1: {
            type: String,
            required: true,
        },
        mechstratDescription1: {
            type: String,
            required: true,
        },
        mechstratImage2: {
            type: String,
            required: true,
        },
        mechstratTitle2: {
            type: String,
            required: true,
        },
        mechstratDescription2: {
            type: String,
            required: true,
        },
        mechstratImage3: {
            type: String,
            required: true,
        },
        mechstratTitle3: {
            type: String,
            required: true,
        },
        mechstratDescription3: {
            type: String,
            required: true,
        },
        mechstratImage4: {
            type: String,
            required: true,
        },
        mechstratTitle4: {
            type: String,
            required: true,
        },
        mechstratDescription4: {
            type: String,
            required: true,
        },
        mechstratImage5: {
            type: String,
            required: true,
        },
        mechstratTitle5: {
            type: String,
            required: true,
        },
        mechstratDescription5: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const HomeModel = mongoose.model("home", homeSchema);
export default HomeModel;
