import mongoose, { mongo } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";

const toggleSubscription = asyncHandler(async (req, res)=>{
    const {channelId} = req.params

    if(!channelId?.trim()) throw new ApiError(400, "ChannelId is missing");

    const subscribe = await Subscription.findOne({
        $and:[
            {subscriber:req.user?._id},
            {channel:new mongoose.Types.ObjectId(channelId)}
        ]
    })

    let toggleSubscribe;

    if(subscribe){
        await Subscription.deleteOne({
            $and:[
                {subscriber:req.user?._id},
                {channel:new mongoose.Types.ObjectId(channelId)}
            ]
        })
        toggleSubscribe = {subscribed: false}
    }else{
        await Subscription.create({
            subscriber:req.user?._id,
            channel: new mongoose.Types.ObjectId(channelId)
        })
        toggleSubscribe = {subscribed: true}
    }

    res
    .status(200)
    .json(new ApiResponse(200, toggleSubscribe, "Subscription status changed"))


})

const getChannelSubscribers = asyncHandler(async (req, res)=>{
    const {channelId} = req.params

    if(!channelId?.trim()) throw new ApiError(400, "channelId is missing");

    const subscribers = await Subscription.find({
        channel: new mongoose.Types.ObjectId(channelId)
    })

    if(!subscribers) throw new ApiError(500, "Something went wrong, while fetching subscribers");

    if(subscribers.length === 0) throw new ApiError(400, "No subscribers found");

    res
    .status(200)
    .json(new ApiResponse(200, subscribers, "Subscribers fetched"))
})

const getSubscribedChannels = asyncHandler(async (req, res)=>{
    const {subscriberId} = req.params

    if(!subscriberId?.trim()) throw new ApiError(400, "subscriberId is missing");

    const channels = await Subscription.find({
        subscriber: new mongoose.Types.ObjectId(subscriberId)
    })

    if(!channels) throw new ApiError(500, "Something went wrong, while fetching channels you subscribed");

    if(channels.length === 0) throw new ApiError(400, "No subscribed channels found");

    res
    .status(200)
    .json(new ApiResponse(200, channels, "Subscribed channels fetched"))
})

export {toggleSubscription, getChannelSubscribers, getSubscribedChannels}