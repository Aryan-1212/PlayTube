import mongoose from "mongoose";
import { Playlist } from "../models/playlist.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name?.trim()) throw new ApiError(400, "Playlist name should be valid");

  const playlist = await Playlist.create({
    name,
    description,
  });

  if (!playlist)
    throw new ApiError(500, "Playlist couldn't be created, try again later");

  res.status(200).json(new ApiResponse(200, playlist, "playlist created"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId?.trim()) throw new ApiError(400, "playlistId is missing");

  const playlist = await Playlist.findById(mongoose.Types.ObjectId(playlistId));

  if (!playlist) throw new ApiError(400, "Playlist doesn't exist");

  res.status(200).json(new ApiResponse(200, playlist, "Playlist fetched"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId?.trim()) throw new ApiError(400, "userId is missing");

  const playlists = await Playlist.find({
    owner: mongoose.Types.ObjectId(userId),
  });

  if (!playlists)
    throw new ApiError(500, "Something went wrong while fetching playlists");

  if (playlists.length === 0) throw new ApiError(404, "No playlist exists");

  res.status(200).json(new ApiResponse(200, playlists, "Playlists fetched"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId?.trim()) throw new ApiError(400, "PlaylistId is missing");

  const deletePlaylist = await Playlist.findByIdAndDelete(
    mongoose.Types.ObjectId(playlistId)
  );

  if (!deletePlaylist)
    throw new ApiError(500, "Couldn't delete the playlist, try again later");

  res
    .status(200)
    .json(new ApiResponse(200, deletePlaylist, "Playlist deleted"));
});

const updatePlaylist = asyncHandler(async (res, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  if (!playlistId?.trim()) throw new ApiError(400, "PlaylistId is missing");

  if (!name?.trim()) throw new ApiError(400, "Playlist name should be valid");

  const updatePlaylist = await Playlist.findByIdAndUpdate(
    mongoose.Types.ObjectId(playlistId),
    {
      name,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatePlaylist)
    throw new ApiError(500, "Couldn't update playlist, try again later");

  res
    .status(200)
    .json(new ApiResponse(200, updatePlaylist, "Playlist updated"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!playlistId?.trim()) throw new ApiError(400, "PlaylistId is missing");
  if (!videoId?.trim()) throw new ApiError(400, "videoId is missing");

  const playlist = await Playlist.findByIdAndUpdate(
    mongoose.Types.ObjectId(playlistId),
    {
      $addToSet: { videos: videoId },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!playlist) throw new ApiError(500, "Playlist not found");

  res
    .status(200)
    .json(new ApiResponse(200, playlist, "Video added to the playlist"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!playlistId?.trim()) throw new ApiError(400, "PlaylistId is missing");
  if (!videoId?.trim()) throw new ApiError(400, "videoId is missing");

  const playlist = await Playlist.findByIdAndUpdate(
    mongoose.Types.ObjectId(playlistId),
    {
      $pull: { videos: videoId },
    },
    {
      new: true,
    }
  );

  if (!playlist) throw new ApiError(500, "Playlist not found");

  res
    .status(200)
    .json(new ApiResponse(200, playlist, "Video removed from the playlist"));
});

export {
  createPlaylist,
  getPlaylistById,
  getUserPlaylists,
  deletePlaylist,
  updatePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
};
