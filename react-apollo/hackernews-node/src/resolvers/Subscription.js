const newLinkSubscribe = (parent, args, context) => {
    return context.pubsub.asyncIterator("NEW_LINK")
}

const newVoteSubscribe = (parent, args, context) => {
    return context.pubsub.asyncIterator("NEW_VOTE")
}

const Subscription = {
    newLink: {
        subscribe: newLinkSubscribe,
        resolve: payload => payload,
    },
    newVote: {
        subscribe: newVoteSubscribe,
        resolve: payload => payload,
    }
}

export default Subscription
