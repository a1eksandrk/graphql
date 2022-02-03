import UserModel from '../models/User.js'
import VoteModel from '../models/Vote.js'

const Link = {
    postedBy: async (parent) => {
        const { postedById } = parent
        return UserModel.findById(postedById)
    },
    votes: async (parent) => {
        const { id } = parent
        return VoteModel.find({ linkId: id })
    }
}

export default Link

