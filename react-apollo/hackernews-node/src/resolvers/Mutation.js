import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { APP_SECRET } from '../utils.js'

import LinkModel from '../models/Link.js'
import UserModel from '../models/User.js'
import VoteModel from '../models/Vote.js'

const Mutation = {
    postLink: async (parent, args, context) => {
        const { description, url } = args
        const { userId } = context

        if (!userId) throw new Error('Not authorized')

        const link = new LinkModel({
            description,
            url,
            postedById: userId
        })

        await link.save()

        await UserModel.findByIdAndUpdate(
            userId,
            { $push: { links: { ...link } } }
        )

        await context.pubsub.publish("NEW_LINK", link)

        return link
    },
    updateLink: async (parent, args, context) => {
        const { id } = args
        const { userId } = context

        if (!userId) throw new Error('Not authorized')

        const link = LinkModel.findById(id)

        link.description = args.description ?? link.description
        link.url = args.url ?? link.url

        const { description, url } = link

        return LinkModel.findByIdAndUpdate(
            id,
            { $set: { description, url } },
            { new: true }
        )
    },
    deleteLink: async (parent, args, context) => {
        const { id } = args
        const { userId } = context

        if (!userId) throw new Error('Not authorized')

        return LinkModel.findByIdAndRemove(id)
    },

    vote: async (parent, args, context) => {
        const { linkId } = args
        const { userId } = context

        if (!userId) throw new Error('Not authorized')

        const isVoted = await VoteModel.where({ linkId, userId }).count() > 0

        if (isVoted) {
            throw new Error(`Already voted for link: ${linkId}`)
        }

        const newVote = new VoteModel({ linkId, userId })

        await newVote.save()
        await context.pubsub.publish("NEW_VOTE", newVote)

        return newVote
    },

    signup: async (parent, args) => {
        const isExist = await UserModel.where({ email: args.email } ).count() > 0

        if (isExist) throw new Error('User with this email already exists')

        const password = await bcrypt.hash(args.password, 10)
        const user = new UserModel({ ...args, password })
        const token = jwt.sign({ userId: user.id }, APP_SECRET)

        await user.save()

        return { token, user }
    },
    login: async (parent, args) => {
        const user = await UserModel.findOne({ email: args.email } )

        if (!user) {
            throw new Error('No such user found')
        }

        const valid = await bcrypt.compare(args.password, user.password)

        if (!valid) {
            throw new Error('Invalid password')
        }

        const token = jwt.sign({ userId: user.id }, APP_SECRET)

        return { token, user }
    }
}

export default Mutation
