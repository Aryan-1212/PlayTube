import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet.controller.js";

const router = Router()

router.use(verifyJWT)

router.route("/create").post(createTweet)

router.route("/update/:tweetId").patch(updateTweet)

router.route("/user/:userId").get(getUserTweets)

router.route("/delete/:tweetId").delete(deleteTweet)


export default router