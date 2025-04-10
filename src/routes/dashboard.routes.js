import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { getChannelStats, getChannelVideos } from "../controllers/dashboard.controller";

const router = Router()
router.use(verifyJWT)

router.use("/stats").get(getChannelStats)
router.use("/videos").get(getChannelVideos)

export default router