import { Router } from "express";
import { addConsultingDetail, createCapexDetail, createScalingStrategy, deleteCapexDetail, deleteConsultingDetail, deleteScalingStrategy, getContactList, Login, updateCapexDetail, updateConsultingDetail, updateScalingStrategy, upsertAI, upsertCapex, upsertConsulting, upsertContactBanner, upsertHome, upsertLeadership, upsertManufacturing, upsertScaling, upsertTechnology } from "../controller/adminController.js";
import { authentication } from "../middleware/authentication.js";
import { authorization } from "../middleware/authorization.js";
import upload from "../middleware/upload.js";
import { getAiDetails, getBanner, getCapex, getCapexDetail, getConsulting, getConsultingDetails, getHomeDetail, getManufacturing, getScaling, getScalingStrategy, getTechnologyDetails, leadership } from "../controller/userController.js";

const adminRouter = Router();

adminRouter.post('/login', Login)

/*=========================== home  =============================== */
adminRouter.get("/home", authentication, authorization(["admin"]), getHomeDetail)
adminRouter.post("/home", authentication, authorization(["admin"]), upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "image", maxCount: 1 },
    { name: "coreImage", maxCount: 1 },
    { name: "mechstratImage1", maxCount: 1 },
    { name: "mechstratImage2", maxCount: 1 },
    { name: "mechstratImage3", maxCount: 1 },
    { name: "mechstratImage4", maxCount: 1 },
    { name: "mechstratImage5", maxCount: 1 }
]), upsertHome);

/*===========================contact page =============================== */
adminRouter.get('/contact-list', authentication, authorization(['admin']), getContactList)
adminRouter.get("/banner", authentication, authorization(['admin']), getBanner)
adminRouter.post('/banner', authentication, authorization(['admin']), upload.single('banner'), upsertContactBanner)


/*===========================leadership page =============================== */
adminRouter.get("/leadership", authentication, authorization(['admin']), leadership)
adminRouter.post("/leadership", authentication, authorization(['admin']), upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'functionImage', maxCount: 1 },
]), upsertLeadership);

adminRouter.get("/consulting", authentication, authorization(['admin']), getConsulting)
adminRouter.post("/consulting", authentication, authorization(['admin']), upsertConsulting)

adminRouter.post("/consulting-detail", authentication, authorization(['admin']), upload.single("image"), addConsultingDetail);
adminRouter.patch("/consulting-detail", authentication, authorization(['admin']), upload.single("image"), updateConsultingDetail);
adminRouter.delete("/consulting-detail/:id", authentication, authorization(['admin']), deleteConsultingDetail);
adminRouter.get("/consulting-detail", authentication, authorization(['admin']), getConsultingDetails);


/*===========================technology page =============================== */
adminRouter.get("/technology", authentication, authorization(['admin']), getTechnologyDetails)
adminRouter.post("/technology", authentication, authorization(['admin']),
    upload.fields([
        { name: 'banner', maxCount: 1 },
        { name: 'businessGrowthImage1', maxCount: 1 },
        { name: 'businessGrowthImage2', maxCount: 1 },
        { name: 'businessGrowthImage3', maxCount: 1 },
    ]),
    upsertTechnology)


/*===========================Ai  =============================== */
adminRouter.get("/ai", authentication, authorization(['admin']), getAiDetails)
adminRouter.post("/ai", authentication, authorization(['admin']),
    upload.fields([
        { name: "banner", maxCount: 1 },
        { name: "marketStrategyImage1", maxCount: 1 },
        { name: "marketStrategyImage2", maxCount: 1 },
        { name: "marketStrategyImage3", maxCount: 1 },
        { name: "partnershipImage", maxCount: 1 }
    ]), upsertAI);

adminRouter.get("/scaling", authentication, authorization(["admin"]), getScaling);
adminRouter.post("/scaling", authentication, authorization(["admin"]), upsertScaling);

adminRouter.post("/strategy-scaling", authentication, authorization(["admin"]), upload.single("image",), createScalingStrategy);
adminRouter.get("/strategy-scaling", authentication, authorization(["admin"]), getScalingStrategy);
adminRouter.patch("/edit-strategy-scaling", authentication, authorization(["admin"]), upload.single("image"), updateScalingStrategy);
adminRouter.delete("/strategy-scaling/:id", authentication, authorization(["admin"]), deleteScalingStrategy);


/*=========================== manufacturing  =============================== */
adminRouter.get("/manufacturing", authentication, authorization(["admin"]), getManufacturing)
adminRouter.post("/manufacturing", authentication, authorization(["admin"]),
    upload.fields([
        { name: "banner", maxCount: 1 },
        { name: "image", maxCount: 1 },
        { name: "strategyImage1", maxCount: 1 },
        { name: "strategicImage", maxCount: 1 },
        { name: "businessImage1", maxCount: 1 },
        { name: "businessImage2", maxCount: 1 },
        { name: "businessImage3", maxCount: 1 }
    ]),
    upsertManufacturing);

adminRouter.get("/capex", authentication, authorization(['admin']), getCapex)
adminRouter.post("/capex", authentication, authorization(['admin']), upsertCapex)

adminRouter.post("/capex-detail", authentication, authorization(["admin"]), upload.single("image",), createCapexDetail);
adminRouter.get("/capex-detail", authentication, authorization(["admin"]), getCapexDetail);
adminRouter.patch("/capex-detail", authentication, authorization(["admin"]), upload.single("image"), updateCapexDetail);
adminRouter.delete("/capex-detail/:id", authentication, authorization(["admin"]), deleteCapexDetail);



export default adminRouter;