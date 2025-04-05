import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Like } from "../models/like.model";
import { ApiResponse } from "../utils/ApiResponse";
import { Comment } from "../models/comment.model";

const toggleVideoLike = asyncHandler( async (req, res)=>{
    const {videoId} = req.params
    if(!videoId?.trim()) throw new ApiError(400,"VideoId is missing");

    const videoLiked = await Like.findOne({
        $and:[
            {likedBy: req.user?._id},
            {video: new mongoose.Types.ObjectId(videoId)}
        ]
    })

    let toggleLike;

    if(videoLiked){
        await Like.deleteOne({
            $and:[
                {video: new mongoose.Types.ObjectId(videoId)},
                {likedBy: req.user._id}
            ]
        })
        toggleLike = {liked: false};
    }else{
        toggleLike = await Like.create({
            video: new mongoose.Types.ObjectId(videoId),
            likedBy: req.user?._id
        })
        toggleLike = {liked: true};
    }

    res.status(200)
    .json(200, toggleLike, "Like status changed")  
})

const toggleCommentLike = asyncHandler( async (req, res)=>{
    const {commentId} = req.params
    if(!commentId?.trim()) throw new ApiError(400,"commentId is missing");

    const commentLiked = await Comment.exists({
        $and:[
            {likedBy: req.user?._id},
            {comment: new mongoose.Types.ObjectId(commentId)}
        ]
    })

    let toggleLike;

    if(commentLiked){
        await Like.deleteOne({
            $and:[
                {comment: new mongoose.Types.ObjectId(commentId)},
                {likedBy: req.user._id}
            ]
        })
        toggleLike = {liked: false};
    }else{
        toggleLike = await Like.create({
            comment: new mongoose.Types.ObjectId(commentId),
            likedBy: req.user?._id
        })
        toggleLike = {liked: true};
    }

    res.status(200)
    .json(200, toggleLike, "Like status changed")  
})

const toggleTweetLike = asyncHandler( async (req, res)=>{
    const {tweetId} = req.params
    if(!tweetId?.trim()) throw new ApiError(400,"tweetId is missing");

    const tweetLiked = await Like.findOne({
        $and:[
            {likedBy: req.user?._id},
            {tweet: new mongoose.Types.ObjectId(tweetId)}
        ]
    })

    let toggleLike;

    if(tweetLiked){
        await Like.deleteOne({
            $and:[
                {tweet: new mongoose.Types.ObjectId(tweetId)},
                {likedBy: req.user._id}
            ]
        })
        toggleLike = {liked: false};
    }else{
        toggleLike = await Like.create({
            tweet: new mongoose.Types.ObjectId(tweetId),
            likedBy: req.user?._id
        })
        toggleLike = {liked: true};
    }

    res.status(200)
    .json(200, toggleLike, "Like status changed")  
})

const getLikedVideos = asyncHandler(async (req, res)=>{
    const {userId} = res.params
    
    if(!userId?.trim()) throw new ApiError(400, "UserId is missing");

    const videos = await Like.aggregate([
        {
            $match:{
                likedBy: mongoose.Types.ObjectId(userId),
                video: {$ne: null} // $ne means not equal, it ensures that video field should not be null
            }
        },{
            $lookup:{
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "video"
            }
        },{
            $unwind: "$video"
        }
    ])

    if(!videos) throw new ApiError(404,"No videos found");
    const videosOnly = videos.map(likedVideoDocument => likedVideoDocument.video) // videos variable would contain all the data incluing unnecessary fields so, only video data are needed to send as response
    if(!videosOnly) throw new ApiError(404,"No videos found");

    res
    .status(200)
    .json(new ApiResponse(200, videosOnly, "Videos fetched"))
})

export {toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos}