import UserModel from '../models/User.js'
import LinkModel from '../models/Link.js'

const Vote = {
    link: async (parent) => {
        const { linkId } = parent
        return LinkModel.findOne({ id: linkId })
    },
    user: async (parent) => {
        const { userId } = parent
        return UserModel.findOne({ id: userId })
    }
}

export default Vote

