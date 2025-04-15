import { Router } from "express";
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylists, removeVideoFromPlaylist, updatePlaylist } from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.use(verifyJWT)

router.route("/create").post(createPlaylist)

router.route("/:playlistId").get(getPlaylistById).delete(deletePlaylist).patch(updatePlaylist)

router.route("/user/:userId").get(getUserPlaylists)
router.route("/add/:playlistId/:videoId").patch(addVideoToPlaylist)
router.route("/remove/:playlistId/:videoId").patch(removeVideoFromPlaylist)


export default router