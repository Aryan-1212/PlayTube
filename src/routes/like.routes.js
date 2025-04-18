import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller.js";

const router = Router();
router.use(verifyJWT)

router.route("/toggle/video/:videoId").get(toggleVideoLike)

router.route("/toggle/comment/:commentId").get(toggleCommentLike)

router.route("/toggle/tweet/:tweetId").get(toggleTweetLike)

router.route("/videos").get(getLikedVideos)

export default router