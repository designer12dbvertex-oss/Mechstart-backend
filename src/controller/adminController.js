import AdminModel from "../models/adminModel.js";
import ConsultingDetailModel from "../models/consultingDetailModel.js";
import ConsultingModel from "../models/consultingModel.js";
import ContactBannerModel from "../models/contactBannerModel.js";
import ContactModel from "../models/contactModel.js";
import LeadershipModel from "../models/leadershipModel.js";
import fs from "fs";
import path from "path";
import TechnologyModel from "../models/technologyModel.js";
import AiModel from "../models/aiModel.js";
import ScalingModel from "../models/scalingModel.js";
import ScalingStrategyModel from "../models/scalingStrategyModel.js";
import ManufacturingModel from "../models/manufacturingModel.js";
import CapexStrategyModel from "../models/capexStrategyModel.js";
import CapexModel from "../models/capexModel.js";
import HomeModel from "../models/homeModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const checkPassword = async (password, hashPassword) => {
    const verifyPassword = await bcrypt.compare(password, hashPassword);
    if (verifyPassword) return verifyPassword;
    throw new Error('Email and Password wrong')
}

const generateToken = async (userData) => {
    const token = await jwt.sign({ id: userData?.id, role: userData?.role }, process.env.JWT_SECRET_KEY, { algorithm: process.env.JWT_ALGORITHM, expiresIn: process.env.JWT_EXPIRE_TIME });
    if (token) return token;
    throw new Error('something went wrong')

}

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req?.body;

        const isExistEmail = await AdminModel.findOne({ email: email });
        if (!isExistEmail) return res.status(404).json({ success: false, message: 'email not valid' })

        await checkPassword(password, isExistEmail?.password);
        const token = await generateToken(isExistEmail);

        const userData = {
            _id: isExistEmail?._id,
            role: isExistEmail?.role,
            token: token
        }
        return res.status(200).json({ message: 'login-successfully', data: userData })
    } catch (error) {
        next(error)
    }
}

const deleteOldImage = (imgPath) => {
    if (!imgPath) return;
    fs.unlink(path.join(imgPath), (err) => {
        if (err && err.code !== "ENOENT") console.log("Delete error:", err);
    });
};

export const getContactList = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const totalItem = await ContactModel.countDocuments();
        const contactData = await ContactModel.find().skip(offset).limit(limit).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: contactData,
            pagination: {
                totalCount: totalItem,
                page: page, limit,
                totalPages: Math.ceil(totalItem / limit)
            }
        })
    } catch (error) {
        next(error)
    }
}

export const upsertContactBanner = async (req, res, next) => {
    try {
        const existing = await ContactBannerModel.findOne();
        if (existing) {
            if (req.file) {
                const oldImagePath = path.join(process.cwd(), existing.banner);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                existing.banner = "public/uploads/" + req.file.filename;
            }
            await existing.save();

            return res.status(200).json({
                success: true,
                message: "banner updated successfully",
                data: existing,
            });
        }

        if (!req.file)
            return res.status(400).json({ success: false, message: "Image is required" });

        const newData = await ContactBannerModel.create({
            banner: "public/uploads/" + req.file.filename,
        });

        return res.status(201).json({
            success: true,
            message: "banner created successfully",
            data: newData,
        });
    } catch (error) {
        next(error)
    }
};


export const upsertLeadership = async (req, res) => {
    try {
        const {
            description,
            title1,
            title2,
            subPoints1,
            subPoints2,
            functionDescription,
            functionTitle,
            functionSubPoints,
        } = req.body;

        const parsedSubPoints1 = typeof subPoints1 === "string" ? JSON.parse(subPoints1) : subPoints1;
        const parsedSubPoints2 = typeof subPoints2 === "string" ? JSON.parse(subPoints2) : subPoints2;
        const parsedFunctionSubPoints =
            typeof functionSubPoints === "string" ? JSON.parse(functionSubPoints) : functionSubPoints;

        const files = req.files || {};

        let existing = await LeadershipModel.findOne();

        let updateData = {
            description,
            title1,
            title2,
            subPoints1: parsedSubPoints1,
            subPoints2: parsedSubPoints2,
            functionDescription,
            functionTitle,
            functionSubPoints: parsedFunctionSubPoints,
        };

        if (existing) {
            updateData.banner = files.banner
                ? `public/uploads/${files.banner[0].filename}`
                : existing.banner;

            updateData.image1 = files.image1
                ? `public/uploads/${files.image1[0].filename}`
                : existing.image1;

            updateData.image2 = files.image2
                ? `public/uploads/${files.image2[0].filename}`
                : existing.image2;

            updateData.functionImage = files.functionImage
                ? `public/uploads/${files.functionImage[0].filename}`
                : existing.functionImage;
        } else {
            if (files.banner) updateData.banner = `public/uploads/${files.banner[0].filename}`;
            if (files.image1) updateData.image1 = `public/uploads/${files.image1[0].filename}`;
            if (files.image2) updateData.image2 = `public/uploads/${files.image2[0].filename}`;
            if (files.functionImage) updateData.functionImage = `public/uploads/${files.functionImage[0].filename}`;
        }

        let saved;

        if (existing) {
            saved = await LeadershipModel.findByIdAndUpdate(existing._id, updateData, { new: true });
        } else {
            saved = await LeadershipModel.create(updateData);
        }

        res.status(200).json({
            success: true,
            message: existing ? "Leadership updated successfully" : "Leadership created successfully",
            data: saved,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


export const upsertConsulting = async (req, res) => {
    try {
        const { description } = req.body;
        let finalDescription = description;

        const existing = await ConsultingModel.findOne();
        let saved;
        if (existing) {
            saved = await ConsultingModel.findByIdAndUpdate(
                existing._id,
                { description: finalDescription },
                { new: true }
            );
        } else {
            saved = await ConsultingModel.create({
                description: finalDescription,
            });
        }
        return res.status(200).json({
            success: true,
            message: existing
                ? "Consulting updated successfully"
                : "Consulting created successfully",
            data: saved,
        });

    } catch (error) {
        next(error)
    }
};




export const addConsultingDetail = async (req, res) => {
    try {
        const { title } = req.body;
        const image = req.file ? `public/uploads/${req.file.filename}` : null;
        const data = await ConsultingDetailModel.create({
            title,
            image,
        });
        return res.status(201).json({
            success: true,
            message: "Consulting detail added successfully",
            data,
        });
    } catch (error) {
        next(error)
    }
};

export const deleteConsultingDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existing = await ConsultingDetailModel.findById(id);
        if (!existing)
            return res.status(404).json({ success: false, message: "Record not found" });

        const oldPath = path.join(process.cwd(), existing.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

        await ConsultingDetailModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Future mobility detail deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const updateConsultingDetail = async (req, res) => {
    try {
        const { _id } = req.body;

        const existing = await ConsultingDetailModel.findById(_id);
        if (!existing)
            return res.status(404).json({ success: false, message: "Record not found" });

        if (req.file) {
            const oldPath = path.join(process.cwd(), existing.image);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
            existing.image = "public/uploads/" + req.file.filename;
        }
        existing.title = req.body.title || existing.title;
        await existing.save();
        return res.status(200).json({
            success: true,
            message: "consult detail updated successfully",
            data: existing
        });
    } catch (error) {
        next(error)
    }
};

export const upsertTechnology = async (req, res, next) => {
    try {
        let tech = await TechnologyModel.findOne();

        const {
            challengeDescription,
            aboutChallenge,
            challengeTitle,
            marketDescription,
            marketStrategy,
            partnershipDescription,
            partnershipStrategy,
            businessDescription,
            businessGrowthTitle1,
            businessGrowthDescription1,
            businessGrowthTitle2,
            businessGrowthDescription2,
            businessGrowthTitle3,
            businessGrowthDescription3
        } = req.body;

        const files = req.files;
        const deleteOldFile = (oldPath) => {
            if (!oldPath) return;
            const fullPath = path.join("public/uploads", oldPath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        };

        if (tech) {
            if (files?.banner?.[0]) {
                deleteOldFile(tech.banner);
                tech.banner = `public/uploads/${files.banner[0].filename}`;
            }

            if (files?.businessGrowthImage1?.[0]) {
                deleteOldFile(tech.businessGrowthImage1);
                tech.businessGrowthImage1 = `public/uploads/${files.businessGrowthImage1[0].filename}`;
            }

            if (files?.businessGrowthImage2?.[0]) {
                deleteOldFile(tech.businessGrowthImage2);
                tech.businessGrowthImage2 = `public/uploads/${files.businessGrowthImage2[0].filename}`;
            }

            if (files?.businessGrowthImage3?.[0]) {
                deleteOldFile(tech.businessGrowthImage3);
                tech.businessGrowthImage3 = `public/uploads/${files.businessGrowthImage3[0].filename}`;
            }

            tech.challengeDescription = challengeDescription;
            tech.aboutChallenge = aboutChallenge;
            tech.challengeTitle = challengeTitle;

            tech.marketDescription = marketDescription;
            tech.marketStrategy = JSON.parse(marketStrategy || "[]");
            tech.partnershipDescription = partnershipDescription;
            tech.partnershipStrategy = JSON.parse(partnershipStrategy || "[]");
            tech.businessDescription = businessDescription;
            tech.businessGrowthTitle1 = businessGrowthTitle1;
            tech.businessGrowthDescription1 = businessGrowthDescription1;
            tech.businessGrowthTitle2 = businessGrowthTitle2;
            tech.businessGrowthDescription2 = businessGrowthDescription2;
            tech.businessGrowthTitle3 = businessGrowthTitle3;
            tech.businessGrowthDescription3 = businessGrowthDescription3;

            await tech.save();

            return res.status(200).json({
                success: true,
                message: "Technology section updated successfully",
                data: tech
            });
        } else {
            const newTech = await TechnologyModel.create({
                banner: `public/uploads/$files?.banner?.[0]?.filename}`,
                businessGrowthImage1: `public/uploads/${files?.businessGrowthImage1?.[0]?.filename}`,
                businessGrowthImage2: `public/uploads/${files?.businessGrowthImage2?.[0]?.filename}`,
                businessGrowthImage3: `public/uploads/${files?.businessGrowthImage3?.[0]?.filename}`,
                challengeDescription,
                aboutChallenge,
                challengeTitle,
                marketDescription,
                marketStrategy: JSON.parse(marketStrategy || "[]"),
                partnershipDescription,
                partnershipStrategy: JSON.parse(partnershipStrategy || "[]"),
                businessDescription,
                businessGrowthTitle1,
                businessGrowthDescription1,
                businessGrowthTitle2,
                businessGrowthDescription2,
                businessGrowthTitle3,
                businessGrowthDescription3
            });

            return res.status(201).json({
                success: true,
                message: "Technology section added successfully",
                data: newTech
            });
        }
    } catch (error) {
        next(error)
    }
};

export const upsertAI = async (req, res, next) => {
    try {
        let ai = await AiModel.findOne();

        const {
            aiDescription,
            marketDescription,
            marketStrategyTitle1,
            marketStrategyDescription1,
            marketStrategyTitle2,
            marketStrategyDescription2,
            marketStrategyTitle3,
            marketStrategyDescription3,
            partnershipDescription,
            partnershipStrategy
        } = req.body;

        const files = req.files;

        const deleteOldFile = (oldPath) => {
            if (!oldPath) return;
            const fullPath = path.join("public/uploads", oldPath.replace("public/uploads/", ""));
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath); // FIXED
            }
        };

        if (ai) {
            if (files?.banner?.[0]) {
                deleteOldFile(ai.banner);
                ai.banner = `public/uploads/${files.banner[0].filename}`;
            }

            if (files?.marketStrategyImage1?.[0]) {
                deleteOldFile(ai.marketStrategyImage1);
                ai.marketStrategyImage1 = `public/uploads/${files.marketStrategyImage1[0].filename}`;
            }

            if (files?.marketStrategyImage2?.[0]) {
                deleteOldFile(ai.marketStrategyImage2);
                ai.marketStrategyImage2 = `public/uploads/${files.marketStrategyImage2[0].filename}`;
            }

            if (files?.marketStrategyImage3?.[0]) {
                deleteOldFile(ai.marketStrategyImage3);
                ai.marketStrategyImage3 = `public/uploads/${files.marketStrategyImage3[0].filename}`;
            }

            if (files?.partnershipImage?.[0]) {
                deleteOldFile(ai.partnershipImage);
                ai.partnershipImage = `public/uploads/${files.partnershipImage[0].filename}`;
            }

            ai.aiDescription = JSON.parse(aiDescription || "[]");  // FIXED
            ai.marketDescription = marketDescription;
            ai.marketStrategyTitle1 = marketStrategyTitle1;
            ai.marketStrategyDescription1 = marketStrategyDescription1;
            ai.marketStrategyTitle2 = marketStrategyTitle2;
            ai.marketStrategyDescription2 = marketStrategyDescription2;
            ai.marketStrategyTitle3 = marketStrategyTitle3;
            ai.marketStrategyDescription3 = marketStrategyDescription3;
            ai.partnershipDescription = partnershipDescription;
            ai.partnershipStrategy = JSON.parse(partnershipStrategy || "[]"); // FIXED

            await ai.save();

            return res.status(200).json({
                success: true,
                message: "AI section updated successfully",
                data: ai
            });

        } else {
            const newAI = await AiModel.create({
                banner: `public/uploads/${files.banner?.[0]?.filename}`,
                marketStrategyImage1: `public/uploads/${files.marketStrategyImage1?.[0]?.filename}`,
                marketStrategyImage2: `public/uploads/${files.marketStrategyImage2?.[0]?.filename}`,
                marketStrategyImage3: `public/uploads/${files.marketStrategyImage3?.[0]?.filename}`,
                partnershipImage: `public/uploads/${files.partnershipImage?.[0]?.filename}`,
                aiDescription: JSON.parse(aiDescription || "[]"),  // FIXED
                marketDescription,
                marketStrategyTitle1,
                marketStrategyDescription1,
                marketStrategyTitle2,
                marketStrategyDescription2,
                marketStrategyTitle3,
                marketStrategyDescription3,
                partnershipDescription,
                partnershipStrategy: JSON.parse(partnershipStrategy || "[]") // FIXED
            });

            return res.status(201).json({
                success: true,
                message: "AI section created successfully",
                data: newAI
            });
        }

    } catch (error) {
        next(error);
    }
};



export const upsertScaling = async (req, res) => {
    try {
        const { description } = req.body;

        let scaling = await ScalingModel.findOne();

        if (scaling) {
            scaling.description = description;
            await scaling.save();

            return res.status(200).json({
                success: true,
                message: "Scaling data updated successfully",
                data: scaling
            });
        } else {
            const newScaling = await ScalingModel.create({ description });

            return res.status(201).json({
                success: true,
                message: "Scaling data created successfully",
                data: newScaling
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const createScalingStrategy = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ success: true, message: 'All field are rewuired' })
        }
        if (!req.file) return res.status(400).json({ success: true, message: 'All field are rewuired' })
        const image = "public/uploads/" + req.file.filename;
        const data = await ScalingStrategyModel.create({
            title,
            description,
            image
        });

        return res.status(201).json({
            success: true,
            message: "Scaling strategy created",
            data
        });

    } catch (error) {
        next(error)
    }
};



export const updateScalingStrategy = async (req, res, next) => {
    try {
        const { title, description, _id } = req.body;

        const existing = await ScalingStrategyModel.findById(_id);
        if (!existing) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        if (req.file) {
            const oldPath = path.join(process.cwd(), existing.image);

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            existing.image = "public/uploads/" + req.file.filename;

        }

        existing.title = title || existing.title;
        existing.description = description || existing.description;

        await existing.save();

        return res.status(200).json({
            success: true,
            message: "Updated successfully",
            data: existing
        });

    } catch (error) {
        next(error);
    }
};

export const deleteScalingStrategy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existing = await ScalingStrategyModel.findById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        let filePath;
        if (existing.image)
            filePath = path.join(process.cwd(), existing.image);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        await existing.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};

export const upsertManufacturing = async (req, res, next) => {
    try {
        const body = req.body;

        let existing = await ManufacturingModel.findOne();

        const files = req.files || {};

        const handleImageUpdate = (fieldName) => {
            if (files[fieldName]) {
                if (existing && existing[fieldName]) {
                    deleteOldImage(existing[fieldName]);
                }
                return "public/uploads/" + files[fieldName][0].filename;
            }
            return existing ? existing[fieldName] : null;
        };

        const data = {
            banner: handleImageUpdate("banner"),
            description: body.description,
            image: handleImageUpdate("image"),
            strategyImage1: handleImageUpdate("strategyImage1"),
            strategyTitle1: body.strategyTitle1,
            strategyDescription1: body.strategyDescription1,
                strategyImage2: handleImageUpdate("strategyImage2"),
            strategyTitle2: body.strategyTitle2,
            strategyDescription2: body.strategyDescription2,
                  strategyImage3: handleImageUpdate("strategyImage3"),
            strategyTitle3: body.strategyTitle3,
            strategyDescription3: body.strategyDescription3,

            strategicDescription: body.strategicDescription,
            strategicImage: handleImageUpdate("strategicImage"),
            strategicTitle1: body.strategicTitle1,
            strategicDescription1: body.strategicDescription1,
            strategicTitle2: body.strategicTitle2,
            strategicDescription2: body.strategicDescription2,
            strategicTitle3: body.strategicTitle3,
            strategicDescription3: body.strategicDescription3,

            businessDescription: body.businessDescription,
            businessImage1: handleImageUpdate("businessImage1"),
            businessTitle1: body.businessTitle1,
            businessDescription1: body.businessDescription1,

            businessImage2: handleImageUpdate("businessImage2"),
            businessTitle2: body.businessTitle2,
            businessDescription2: body.businessDescription2,

            businessImage3: handleImageUpdate("businessImage3"),
            businessTitle3: body.businessTitle3,
            businessDescription3: body.businessDescription3,
        };

        if (!existing) {
            const created = await ManufacturingModel.create(data);
            return res.status(201).json({
                success: true,
                message: "Manufacturing data created",
                data: created
            });
        }

        Object.assign(existing, data);
        await existing.save();

        return res.status(200).json({
            success: true,
            message: "Manufacturing data updated",
            data: existing
        });

    } catch (error) {
        next(error);
    }
};

export const upsertCapex = async (req, res) => {
    try {
        const { description } = req.body;
        let finalDescription = description;

        const existing = await CapexModel.findOne();
        let saved;
        if (existing) {
            saved = await CapexModel.findByIdAndUpdate(
                existing._id,
                { description: finalDescription },
                { new: true }
            );
        } else {
            saved = await CapexModel.create({
                description: finalDescription,
            });
        }
        return res.status(200).json({
            success: true,
            message: existing
                ? "capex updated successfully"
                : "capex created successfully",
            data: saved,
        });

    } catch (error) {
        next(error)
    }
};


export const createCapexDetail = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: true, message: 'All field are rewuired' })
        }
        if (!req.file) return res.status(400).json({ success: true, message: 'All field are rewuired' })
        const image = "public/uploads/" + req.file.filename;

        const data = await CapexStrategyModel.create({
            title,
            description,
            image
        });

        return res.status(201).json({
            success: true,
            message: "Scaling strategy created",
            data
        });

    } catch (error) {
        next(error)
    }
};



export const updateCapexDetail = async (req, res, next) => {
    try {
        const { title, description, _id } = req.body;

        const existing = await CapexStrategyModel.findById(_id);
        if (!existing) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        if (req.file) {
            const oldPath = path.join(process.cwd(), existing.image);

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            existing.image = "public/uploads/" + req.file.filename;
        }

        existing.title = title || existing.title;
        existing.description = description || existing.description;

        await existing.save();

        return res.status(200).json({
            success: true,
            message: "Updated successfully",
            data: existing
        });

    } catch (error) {
        next(error);
    }
};

export const deleteCapexDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existing = await CapexStrategyModel.findById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        let filePath;
        if (existing.image)
            filePath = path.join(process.cwd(), existing.image);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await existing.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};


export const upsertHome = async (req, res, next) => {
    try {
        let existing = await HomeModel.findOne();
        const files = req.files || {};
        const body = req.body;
        const handleImage = (field) => {
            if (files[field]) {
                if (existing?.[field]) deleteOldImage(existing[field]);
                return "public/uploads/" + files[field][0].filename;
            }
            return existing ? existing[field] : null;
        };
        const data = {
            banner: handleImage("banner"),
            bannerTitle: body.bannerTitle,
            bannerDescription: body.bannerDescription,

            image: handleImage("image"),
            aboutDescription: JSON.parse(body.aboutDescription || "[]"),

            visionDescription: body.visionDescription,
            coreTitle: body.coreTitle,
            coreItems: JSON.parse(body.coreItems) || "[]",
            coreImage: handleImage("coreImage"),

            mechstratImage1: handleImage("mechstratImage1"),
            mechstratTitle1: body.mechstratTitle1,
            mechstratDescription1: body.mechstratDescription1,

            mechstratImage2: handleImage("mechstratImage2"),
            mechstratTitle2: body.mechstratTitle2,
            mechstratDescription2: body.mechstratDescription2,

            mechstratImage3: handleImage("mechstratImage3"),
            mechstratTitle3: body.mechstratTitle3,
            mechstratDescription3: body.mechstratDescription3,

            mechstratImage4: handleImage("mechstratImage4"),
            mechstratTitle4: body.mechstratTitle4,
            mechstratDescription4: body.mechstratDescription4,

            mechstratImage5: handleImage("mechstratImage5"),
            mechstratTitle5: body.mechstratTitle5,
            mechstratDescription5: body.mechstratDescription5,
        };
        if (!existing) {
            const created = await HomeModel.create(data);
            return res.status(201).json({
                success: true,
                message: "Home page created successfully",
                data: created,
            });
        }
        Object.assign(existing, data);
        await existing.save();
        return res.status(200).json({
            success: true,
            message: "Home page updated successfully",
            data: existing,
        });

    } catch (error) {
        next(error);
    }
};