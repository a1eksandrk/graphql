import LinkModel from '../models/User.js'

const User = {
    links: async (parent) => {
        const { id } = parent
        return LinkModel.find({ postedById: id })
    }
}

export default User


