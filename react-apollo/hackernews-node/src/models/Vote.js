import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const voteSchema = new Schema({
    linkId: { type: Schema.Types.ObjectId, ref: 'Link' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.model('Vote', voteSchema)
