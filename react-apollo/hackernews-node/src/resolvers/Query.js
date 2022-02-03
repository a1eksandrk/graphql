import Link from '../models/Link.js'

const Query = {
    info: () => 'This is the API of a Hackernews Clone',
    feed: async (parent, args) => {
        const { filter, skip, limit, orderBy } = args
        const regex = { $regex: new RegExp(filter, 'i') }
        const where = filter
            ? {
                $or: [
                    { description: regex },
                    { url: regex }
                ]
            } : {}

        const links = await Link
            .find(where)
            .skip(skip)
            .limit(limit)
            .sort(orderBy)
        const count = await Link.find(where).count()

        return {
            links,
            count
        }
    }
}

export default Query
