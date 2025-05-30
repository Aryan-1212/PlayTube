import { Router } from "express";
import { deleteComment, getAllComments, publishComment, updateComment } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.use(verifyJWT)

router.route("/:videoId").get(getAllComments).post(publishComment)
router.route("/c/:commentId").delete(deleteComment).patch(updateComment)

export default router