import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const linkSchema = new Schema({
    createdAt: { type: Date, default: Date.now() },
    description: String,
    url: String,
    postedById: { type: Schema.Types.ObjectId, ref: 'User' },
    votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
})

export default mongoose.model('Link', linkSchema)
