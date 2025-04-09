import mongoose from "mongoose";
import { Comment } from "../models/comment.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

const publishComment = asyncHandler(async (req, res)=>{
    const {content} = req.body
    const {videoId} = req.params

    if(!content?.trim()) throw new ApiError(400, "comment can't be empty");
    if(!videoId?.trim()) throw new ApiError(400, "VideoId is missing");

    const comment = await Comment.create({
        content,
        video: mongoose.Types.ObjectId(videoId),
        owner: mongoose.Types.ObjectId(req.user?._id)
    })

    if(!comment) throw new ApiError(500, "unable to upload the comment due to internal server error! Try again later");

    res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment published successfully"))
})

const getAllComments = asyncHandler(async (req, res)=>{
    const {vidoeId} = req.params
    const {page=1, limit=10} = req.query
    //TODO: Fetch Comments based on page and limits
})

const deleteComment = asyncHandler(async (res, res)=>{
    const {commentId} = req.params

    if(!commentId?.trim()) throw new ApiError(400, "commentId is missing");

    const deleteComment = await Comment.findOneAndDelete({
        _id: mongoose.Types.ObjectId(commentId)
    })

    if(!deleteComment) throw new ApiError(500, "unable to delete the comment! try again later");
    
    res
    .status(200)
    .json(new ApiResponse(200, deleteComment, "Comment deleted successfully"))
})

const updateComment = asyncHandler(async (res, res)=>{
    const {commentId} = req.params
    const {content} = req.body

    if(!commentId?.trim()) throw new ApiError(400, "commentId is missing");
    if(!content?.trim()) throw new ApiError(400, "comment can't be empty");

    const updateComment = await Comment.findByIdAndUpdate(
        mongoose.Types.ObjectId(commentId),{
        content
    },{
        new: true,
        runValidators: true
    })

    if(!updateComment) throw new ApiError(500, "unable to update the comment! Try again later");

    res
    .status(200)
    .json(new ApiResponse(200, updateComment, "Comment updated successfully"))
})

export {publishComment, getAllComments, deleteComment, updateComment}