import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import { ApolloServer, PubSub } from 'apollo-server'

import Query from './resolvers/Query.js'
import Mutation from './resolvers/Mutation.js'
import Subscription from './resolvers/Subscription.js'
import Link from './resolvers/Link.js'
import User from './resolvers/User.js'
import Vote from './resolvers/Vote.js'

import { __dirname, getUserId } from './utils.js'

const DB_NAME = 'hackernews'

const pubsub = new PubSub()

const typeDefs = fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    { encoding: "utf8" }
);

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Link,
    User,
    Vote
}

const context = ({ req }) => ({
    ...req,
    pubsub,
    userId:
        req && req.headers.authorization
            ? getUserId(req)
            : null
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
})

mongoose
    .connect(`mongodb://localhost:27017/${DB_NAME}`)
    .then((db) => console.log(`Connected to <${db.connection.name}> DB`))
    .catch((error) => console.error(error.message || error))

server
    .listen()
    .then(({ url }) => console.log(`Server is running on ${url}`))
    .catch((error) => console.error(error.message || error))


