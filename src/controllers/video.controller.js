import { mongoose } from "mongoose";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from '../utils/ApiResponse.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

// TODO: GET ALL VIDEOS

const publishVideo = asyncHandler(async(req, res)=>{
    const {title, description} = req.body
    
    let localVideoPath
    let localThumbnailPath
    if(req.files && Array.isArray(req.files.videoFile) && req.files.videoFile.length>0){
        localVideoPath = req.files.videoFile[0].path
    }

    if(req.files && Array.isArray(req.files.thumbnail)&&req.files.thumbnail.length>0){
        localThumbnailPath = req.files.thumbnail[0].path
    }

    if(!localVideoPath) throw new ApiError(400, "Video is required to be published");
    if(!localThumbnailPath) throw new ApiError(400, "Thumbnail is required")

    const videoCloudinaryPath = await uploadOnCloudinary(localVideoPath)
    const thumbnailCloudinaryPath = await uploadOnCloudinary(localThumbnailPath)

    if(!thumbnailCloudinaryPath) throw new ApiError(400, "thumbnail is required");
    if(!videoCloudinaryPath) throw new ApiError(400, "Video is required to be published");
    // If video uploads successfully, it will return url and duration

    const video = await Video.create({
        videoFile: videoCloudinaryPath?.url,
        thumbnail: thumbnailCloudinaryPath?.url,
        owner: req.user?._id,
        title,
        description,
        duration: videoCloudinaryPath?.duration,
    })
    
    return res
    .status(200)
    .json(new ApiResponse(200, {video}, "Video uploaded successfully"))
})

const getVideoById = asyncHandler(async(req,res)=>{
    const {videoId} = req.params

    // videoId = new mongoose.Types.ObjectId(videoId)

    if(!videoId?.trim()) throw new ApiError(400, "Video Id is missing");

    const video = await Video.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(videoId)
            },   
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
            },
        },
        {
            $unwind: "$owner"
        },
        {
            $lookup:{
                from: "subscriptions",
                localField: "owner._id",
                foreignField: "channel",
                as: "subscribers"
            },
        },
        {
            $addFields:{
                "owner.subscriberCount": {
                    $size: "$subscribers"
                },
                "owner.isSubscribed":{
                    $cond:{
                        if: {
                            $in: [req.user?._id, "$subscribers.subscriber"]
                        },
                        then: true,
                        else: false
                    }
                }
            },
        },{
            $project: {
                videoFile: 1,
                thumbnail: 1,
                title: 1,
                duration: 1,
                description:1,
                views: 1,
                isPublished: 1,
                "owner.username": 1,
                "owner.avatar": 1,
                "owner.subscriberCount": 1,
                "owner.isSubscribed": 1
            }
        }
    ])

    if(!video) throw new ApiError(404, "No video found");

    return res
    .status(200)
    .json(new ApiResponse(200, video[0], "Video fetched successfully"))

})

const deleteVideo = asyncHandler(async(req, res)=>{
    const {videoId} = req.params

    if(!videoId?.trim()) throw new ApiError(400,"VideoId is missing");

    const video = await Video.findById(new mongoose.Types.ObjectId(videoId))
    if(!video) throw new ApiError(404, "Video not found");

    const videoCloudinaryPath = video.videoFile
    const thumbnailCloudinaryPath = video.thumbnail

    await deleteFromCloudinary(videoCloudinaryPath)
    await deleteFromCloudinary(thumbnailCloudinaryPath)

    const deleteVideo = await video.deleteOne()

    if(!deleteVideo) throw new ApiError(500, "Something went wrong while deleting video");

    return res
    .status(200)
    .json(new ApiResponse(200, deleteVideo, "Video deleted successfully"))
})

const updateVideo = asyncHandler(async(req, res)=>{
    const {title, description} = req.body
    const {videoId} = req.params
    
    if(!videoId?.trim()) throw new ApiError(400, "VideoId is missing");

    let thumbnailLocalPath
    if(req.files && Array.isArray(req.files.thumbnail) && req.files.thumbnail.length>0){
        thumbnailLocalPath = req.files.thumbnail[0].path
    }

    if(!thumbnailLocalPath) throw new ApiError(400, "Thumbnail is required");

    const thumbnailCloudinaryPath = await uploadOnCloudinary(thumbnailLocalPath)

    if(!thumbnailCloudinaryPath) throw new ApiError(400,"Thumbnail is required");

    const video = await Video.findById(videoId)
    
    if(!video) throw new ApiError(404, "Video doesn't exist");

    await deleteFromCloudinary(video.thumbnail)

    video.title = title
    video.description = description
    video.thumbnail = thumbnailCloudinaryPath

    await video.save()
    
    return req
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully"))
})

const togglePublishStatus = asyncHandler(async(req, res)=>{
    const {videoId} = req.params

    if(!videoId?.trim()) throw new ApiError(400, "VideoId is missing");

    const video = Video.findByIdAndUpdate(new mongoose.Types.ObjectId(videoId),{
        $set:{
            isPublished: !isPublished
        }
    },{
        new: true,
        runValidators: true
    })

    if(!video) throw new ApiError(400, "something went wrong while toggling publish status");

    return res
    .status(200)
    .json(new ApiResponse(200, video, "publish status changed successfully"))
})

export {publishVideo, getVideoById, deleteVideo, updateVideo, togglePublishStatus}