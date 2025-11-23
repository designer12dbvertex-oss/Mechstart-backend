import mongoose from "mongoose";

const aiSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
        },
        aiDescription: {
            type: [String],
            required: false,
            trim: true,
        },
        marketDescription: {
            type: String,
            required: true,
        },

        marketStrategyImage1: {
            type: String,
            required: true,
        },
        marketStrategyTitle1: {
            type: String,
            required: true,
        },
        marketStrategyDescription1: {
            type: String,
            required: true,
        },
        marketStrategyImage2: {
            type: String,
            required: true,
        },
        marketStrategyTitle2: {
            type: String,
            required: true,
        },
        marketStrategyDescription2: {
            type: String,
            required: true,
        },
        marketStrategyImage3: {
            type: String,
            required: true,
        },
        marketStrategyTitle3: {
            type: String,
            required: true,
        },
        marketStrategyDescription3: {
            type: String,
            required: true,
        },
        partnershipDescription: {
            type: String,
            required: true,
        },
        partnershipImage: {
            type: String,
            required: true,
        },
        partnershipStrategy: [{
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            }
        }
        ]
    },
    { timestamps: true }
);

const AiModel = mongoose.model("ai", aiSchema);
export default AiModel;
