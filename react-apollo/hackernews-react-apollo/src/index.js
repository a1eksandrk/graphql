import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'

import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

const URL = 'http://localhost:4000'

const httpLink = createHttpLink({
    uri: URL
})

const authLink = setContext((_, { headers }) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWYyN2Q3YWU5MGUyN2IxYmFjOTExZmUiLCJpYXQiOjE2NDM0NDg4Nzh9.RIuHtI1-ypjtiJG1WsysQb81_NCsJ0XHZfCC0uzUqL4';
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
