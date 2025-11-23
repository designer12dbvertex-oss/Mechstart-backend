import mongoose from "mongoose";

const contactBannerSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const ContactBannerModel = mongoose.model("contactBanner", contactBannerSchema);
export default ContactBannerModel;
