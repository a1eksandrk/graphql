import express from 'express'
import cors from 'cors'
import {graphqlHTTP} from 'express-graphql'

import {schema} from './schema.js';

const users = [{id: 1, username: 'Alex', age: 26}]

const app = express()
app.use(cors())

const createUser = input => ({
    id: Date.now(),
    ...input
})

const root = {
    getAllUsers: () => users,
    getUser: ({id}) => users.find(user => `${user.id}` === `${id}`),
    createUser: ({input}) => {
        const createdUser = createUser(input)
        users.push(createdUser)
        return createdUser
    }
}


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(5000, () => console.log('server was started on port 5000'))
