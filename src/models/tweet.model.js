import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
import { Like } from './like.model.js'

const tweetSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content:{
        type: String,
    }
},{
    timestamps: true
})

tweetSchema.plugin(mongooseAggregatePaginate)

tweetSchema.pre("deleteOne",{document: true, query: false}, async(next)=>{
    const tweetId = this._id
    await Like.deleteMany({tweet: tweetId})
    next()
})

export const Tweet = mongoose.model("Tweet", tweetSchema)