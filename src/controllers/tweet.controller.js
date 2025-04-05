import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";


const createTweet = (asyncHandler(async (req, res)=>{
    const {content} = req.body

    const tweet = await Tweet.create({
        owner: req.user?._id,
        content
    })

    if(!tweet) throw new ApiError(500, "Something went wrong while publishing tweet");

    return res
    .status(200)
    .json(ApiResponse(200, tweet, "Tweet published successfully"))
}))

const updateTweet = (asyncHandler(async (req, res)=>{
    const {tweetId} = req.params
    const {content} = req.body

    if(!tweetId?.trim()) throw new ApiError(400, "TweetId is missing");

    const tweet = await Tweet.findByIdAndUpdate(new mongoose.Types.ObjectId(tweetId),{
        content
    },{
        new: true,
        runValidators: true
    })

    if(!tweet) throw new ApiError(500, "Something went wrong while updating tweet");

    return res
    .status(200)
    .json(ApiResponse(200, tweet, "Tweet updated successfully"))
}))

const getUserTweets = (asyncHandler(async (req, res)=>{
    const {userId} = req.params

    const tweets = await Tweet.aggregate([
        {
            $match: {
                $owner: new mongoose.Types.ObjectId(userId)
            }
        },
    ])

    if(!tweets) throw new ApiError(404, "Tweets not found");

    return res
    .status(200)
    .json(200, tweets, "Tweets fetched successfully")

}))

const deleteTweet = (asyncHandler(async (req, res)=>{
    const {tweetId} = req.params

    if(!tweetId?.trim()) throw new ApiError(400, "TweetId is missing");

    const tweet = Tweet.findById(new mongoose.Types.ObjectId(tweetId))

    if(!tweet) throw new ApiError(404, "Requested tweet not found");

    const deletedTweet = await tweet.deleteOne()

    if(!deletedTweet) throw new ApiError(500, "Something went wrong while deleting tweet");

    return res
    .status(200)
    .json(200, deletedTweet, "Tweet deleted successfully")
}))


export {createTweet, updateTweet, getUserTweets, deleteTweet}