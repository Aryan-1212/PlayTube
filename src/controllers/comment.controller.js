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
        video: new mongoose.Types.ObjectId(videoId),
        owner: new mongoose.Types.ObjectId(req.user?._id)
    })

    if(!comment) throw new ApiError(500, "unable to upload the comment due to internal server error! Try again later");

    res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment published successfully"))
})

const getAllComments = asyncHandler(async (req, res)=>{
    const {videoId} = req.params
    const {page=1, limit=10} = req.query

    if(!videoId?.trim()) throw new ApiError(400, "videoId is missing");
    
    const skip = (parseInt(page)-1) * parseInt(limit)

    const commentsQuery = await Comment.aggregate([
        {
            $match:{
                video: new mongoose.Types.ObjectId(videoId)
            }
        },{
            $sort:{
                createdAt:-1
            }
        },{
            $lookup:{
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project:{
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },{
            $unwind: "$user"
        },{
            $facet:{
                data:[
                    {$skip: skip},
                    {$limit: parseInt(limit)}
                ],
                commentsCount:[
                    {$count: "count"}
                ]
            }
        }
    ])

    const totalComments = commentsQuery[0]?.commentsCount[0]?.count || 0

    const result = {
        comments: commentsQuery[0]?.data || [],
        totalComments,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalComments/limit)
    }

    res
    .status(200)
    .json(new ApiResponse(
        200,
        result,
        "Comments fetched successfully"
    ))

})

const deleteComment = asyncHandler(async (res, res)=>{
    const {commentId} = req.params

    if(!commentId?.trim()) throw new ApiError(400, "commentId is missing");

    const deleteComment = await Comment.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(commentId)
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
        new mongoose.Types.ObjectId(commentId),{
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