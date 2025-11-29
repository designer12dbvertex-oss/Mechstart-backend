// import mongoose from "mongoose";

// const contactBannerSchema = new mongoose.Schema(
//     {
//         banner: {
//             type: String,
//             required: false,
//         },
//     },
//     { timestamps: true }
// );

// const ContactBannerModel = mongoose.model("contactBanner", contactBannerSchema);
// export default ContactBannerModel;

import mongoose from "mongoose";

const contactBannerSchema = new mongoose.Schema(
    {
        banner: { type: String },
        phone: { type: String },
        fax: { type: String },
        email: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("contactBanner", contactBannerSchema);
