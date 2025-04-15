import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";

const getChannelVideos = asyncHandler(async (req, res)=>{
    const videos = await Video.find({owner: req.user?._id})

    if(!videos) new ApiError(500, "Couldn't fetch videos, try again later");
    if(videos.length===0) new ApiError(404, "No videos found");

    res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched"))
})

const getChannelStats = asyncHandler(async (req, res)=>{
    // videosStats will contain total videos count and total views 
    const videosStats = await Video.aggregate([
        {
            $match:{
                owner: req.user?._id
            }
        },{
            $group:{
                _id: null,
                videosCount: {$sum: 1},
                viewsCount: {$sum: "$views"}
            }
        },{
            $project:{
                videosCount:1,
                viewsCount:1
            }
        }
    ])

    const subscriberCount = await Subscription.countDocuments({
        channel: req.user?._id
    })

    const likesCount = await Like.countDocuments({
            likedBy:req.user?._id,
            video: {$ne:null}
    })

    if(!videosStats) throw new ApiError(500, "Couldn't fetch the stats, try again later");
    if(videosStats.length===0) throw new ApiError(400, "Not having enough data to calculate stats");

    res
    .status(200)
    .json(new ApiResponse(200, {
        totalViews: videosStats[0]?.viewsCount || 0,
        totalVideos: videosStats[0]?.videosCount || 0,
        totalSubscribers:subscriberCount,
        totalLikes:likesCount
    }, "Stats fetched"))
})

export {getChannelStats, getChannelVideos}