import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { getChannelSubscribers, getSubscribedChannels, toggleSubscription } from "../controllers/subscription.controller";

const router = Router();
router.use(verifyJWT)

router.route("/toggle/:channelId").get(toggleSubscription)

router.route("/subscribers/:channelId").get(getChannelSubscribers)

router.route("/channels/:subscriberId").get(getSubscribedChannels)


export default router