import { Router } from "express";
import { getAiDetails, getBanner, getCapex, getCapexDetail, getConsulting, getConsultingDetails, getHomeDetail, getManufacturing, getScaling, getScalingStrategy, getTechnologyDetails, leadership } from "../controller/userController.js";

const userRouter=Router();

userRouter.get("/home", getHomeDetail)

userRouter.get("/vision-detail", getConsultingDetails);
userRouter.get("/vision", getConsulting)
userRouter.get("/leadership", leadership)

userRouter.get("/technology", getTechnologyDetails)


userRouter.get("/manufacturing", getManufacturing)
userRouter.get("/capex", getCapex)
userRouter.get("/capex-detail", getCapexDetail);

userRouter.get("/ai",  getAiDetails)
userRouter.get("/scaling", getScaling);
userRouter.get("/strategy-scaling", getScalingStrategy);


userRouter.get("/banner",  getBanner)


export default userRouter;