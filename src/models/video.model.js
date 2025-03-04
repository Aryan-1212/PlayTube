import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
import { Like } from './like.model.js'
import { Comment } from './comment.model.js'
import {User} from './user.model.js'
import { Playlist } from './playlist.model.js'

const videoSchema = new mongoose.Schema({
    videoFile:{
        type:String,
        required: true,
    },
    thumbnail:{
        type:String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String
    },
    duration:{
        type: Number,
        required: true
    },
    views:{
        type:Number,
        default: 0
    },
    isPublished:{
        type: Boolean,
        default: true
    }
},{timestamps: true})

videoSchema.pre("deleteOne", {document: true, query: false}, async (next)=>{
    const videoId = this._id
    await Like.deleteMany({video: videoId})
    await Comment.deleteMany({video: videoId})
    await User.updateMany({
        watchHistory: videoId
    },{
        $pull: {
            watchHistory: videoId
        }
    })
    await Playlist.updateMany({
        videos: videoId
    },{
        $pull: {
            videos: videoId
        }
    })

    next()
})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video', videoSchema)