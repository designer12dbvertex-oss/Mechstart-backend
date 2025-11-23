import mongoose from "mongoose";

const technologySchema = new mongoose.Schema(
    {
         banner: {
            type: String,
            required: true,
        },
        challengeDescription: {
            type: [String],
            required: false,
            trim: true,
        },
        marketDescription: {
            type: String,
            required: true,
        },
        marketStrategy: [
            {
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                }
            }
        ],
        partnershipDescription: {
            type: String,
            required: true,
        },
        partnershipStrategy: [
            {
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                }
            }
        ],
        businessDescription: {
            type: String,
            required: true,
        },
        businessGrowthImage1: {
            type: String,
            required: true,
        },
        businessGrowthTitle1: {
            type: String,
            required: true,
        },
        businessGrowthDescription1: {
            type: String,
            required: true,
        },
        businessGrowthImage2: {
            type: String,
            required: true,
        },
        businessGrowthTitle2: {
            type: String,
            required: true,
        },
        businessGrowthDescription2: {
            type: String,
            required: true,
        },
        businessGrowthImage3: {
            type: String,
            required: true,
        },
        businessGrowthTitle3: {
            type: String,
            required: true,
        },
        businessGrowthDescription3: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const TechnologyModel = mongoose.model("technology", technologySchema);
export default TechnologyModel;
