import mongoose from "mongoose";

const manufacturingSchema = new mongoose.Schema(
    {
         banner: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        strategyImage1: {
            type: String,
            required: true,
        },
        strategyTitle1: {
            type: String,
            required: true,
        },
        strategyDescription1: {
            type: String,
            required: true,
        },
        strategicDescription: {
            type: String,
            required: true,
        },
        strategicImage: {
            type: String,
            required: true,
        },
        strategicTitle1: {
            type: String,
            required: true,
        },
        strategicDescription1: {
            type: String,
            required: true,
        },
        strategicTitle2: {
            type: String,
            required: true,
        },
        strategicDescription2: {
            type: String,
            required: true,
        },
        strategicTitle3: {
            type: String,
            required: true,
        },
        strategicDescription3: {
            type: String,
            required: true,
        },
        businessDescription: {
            type: String,
            required: true,
        },
        businessImage1: {
            type: String,
            required: true,
        },
        businessTitle1: {
            type: String,
            required: true,
        },
        businessDescription1: {
            type: String,
            required: true,
        },
        businessImage2: {
            type: String,
            required: true,
        },
        businessTitle2: {
            type: String,
            required: true,
        },
        businessDescription2: {
            type: String,
            required: true,
        },
        businessImage3: {
            type: String,
            required: true,
        },
        businessTitle3: {
            type: String,
            required: true,
        },
        businessDescription3: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const ManufacturingModel = mongoose.model("manufacturing", manufacturingSchema);
export default ManufacturingModel;
