import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const tweetSchema = new mongoose.Schema({
    owner:{
        type: mongoose.schema.Types.ObjectId,
        ref: "User"
    },
    content:{
        type: string,
    }
},{
    timestamps: true
})

tweetSchema.plugin(mongooseAggregatePaginate)

export const Tweet = mongoose.model("Tweet", tweetSchema)