import mongoose, { mongo } from "mongoose";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Like } from "../models/like.model";
import { ApiResponse } from "../utils/ApiResponse";
import { Subscription } from "../models/subscription.model";

const toggleSubscription = asyncHandler(async (req, res)=>{
    const {channelId} = req.params

    if(!channelId?.trim()) throw new ApiError(400, "ChannelId is missing");

    const subscribe = await Subscription.findOne({
        $and:[
            {subscriber:req.user?._id},
            {channel:mongoose.Types.ObjectId(channelId)}
        ]
    })

    let toggleSubscribe;

    if(subscribe){
        await Subscription.deleteOne({
            $and:[
                {subscriber:req.user?._id},
                {channel:mongoose.Types.ObjectId(channelId)}
            ]
        })
        toggleSubscribe = {subscribed: false}
    }else{
        await Subscription.create({
            subscriber:req.user?._id,
            channel: mongoose.Types.ObjectId(channelId)
        })
        toggleSubscribe = {subscribed: true}
    }

    res
    .status(200)
    .json(200, toggleSubscribe, "Subscription status changed")


})

const getChannelSubscribers = asyncHandler(async (req, res)=>{
    const {channelId} = req.params

    if(!channelId?.trim()) throw new ApiError(400, "channelId is missing");

    const subscribers = await Subscription.find({
        channel: mongoose.Types.ObjectId(channelId)
    })

    if(!subscribers) throw new ApiError(500, "Something went wrong, while fetching subscribers");

    if(subscribers.length === 0) throw new ApiError(400, "No subscribers found");

    res
    .status(200)
    .json(new ApiResponse(200, subscribers, "Subscribers fetched"))
})

const getSubscribedChannels = asyncHandler(async (req, res)=>{
    const {subsciberId} = req.params

    if(!subsciberId?.trim()) throw new ApiError(400, "subscriberId is missing");

    const channels = await Subscription.find({
        subscriber: mongoose.Types.ObjectId(subsciberId)
    })

    if(!channels) throw new ApiError(500, "Something went wrong, while fetching channels you subscribed");

    if(channels.length === 0) throw new ApiError(400, "No subscribed channels found");

    res
    .status(200)
    .json(new ApiResponse(200, channels, "Subscribed channels fetched"))
})

export {toggleSubscription, getChannelSubscribers, getSubscribedChannels}