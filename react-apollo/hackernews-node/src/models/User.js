import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    links: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
    votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
})

export default mongoose.model('User', userSchema)
