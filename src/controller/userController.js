import AiModel from "../models/aiModel.js";
import CapexModel from "../models/capexModel.js";
import CapexStrategyModel from "../models/capexStrategyModel.js";
import ConsultingDetailModel from "../models/consultingDetailModel.js";
import ConsultingModel from "../models/consultingModel.js";
import ContactBannerModel from "../models/contactBannerModel.js";
import HomeModel from "../models/homeModel.js";
import LeadershipModel from "../models/leadershipModel.js";
import ManufacturingModel from "../models/manufacturingModel.js";
import ScalingModel from "../models/scalingModel.js";
import ScalingStrategyModel from "../models/scalingStrategyModel.js";
import TechnologyModel from "../models/technologyModel.js";

export const leadership = async (req, res, next) => {
    try {
        const leadershipData = await LeadershipModel.findOne();
        return res.status(200).json({ success: true, data: leadershipData, })
    } catch (error) {
        next(error)
    }
}

export const getBanner = async (req, res, next) => {
    try {
        const bannerData = await ContactBannerModel.findOne();
        return res.status(200).json({ success: true, data: bannerData, })
    } catch (error) {
        next(error)
    }
}


export const getConsulting = async (req, res, next) => {
    try {
        const consultingData = await ConsultingModel.findOne();
        return res.status(200).json({ success: true, data: consultingData, })
    } catch (error) {
        next(error)
    }
}

export const getConsultingDetails = async (req, res) => {
    try {
        const data = await ConsultingDetailModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data,
        });

    } catch (error) {
        next(error)
    }
};


export const getTechnologyDetails = async (req, res) => {
    try {
        const data = await TechnologyModel.findOne()
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error)
    }
};


export const getAiDetails = async (req, res) => {
    try {
        const data = await AiModel.findOne()
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error)
    }
};

export const getScaling = async (req, res) => {
    try {
        const data = await ScalingModel.findOne()
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error)
    }
};

export const getScalingStrategy = async (req, res) => {
    try {
        const data = await ScalingStrategyModel.find().sort({createdAt:-1})
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error)
    }
};

export const getManufacturing = async (req, res) => {
    try {
        const data = await ManufacturingModel.findOne()
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error)
    }
};

export const getCapex = async (req, res) => {
    try {
        const data = await CapexModel.findOne()
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error)
    }
};

export const getCapexDetail = async (req, res) => {
    try {
        const data = await CapexStrategyModel.find().sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error)
    }
};

export const getHomeDetail = async (req, res) => {
    try {
        const data = await HomeModel.findOne();
        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error)
    }
};