import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'

import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'
import { withClientState } from 'apollo-link-state'

import './index.css'
import Gooseberries from './Gooseberries'
import * as serviceWorker from './serviceWorker'
import { AUTH_TOKEN } from './constants'
import defaults from './defaults'

const cache = new InMemoryCache()

const stateLink = withClientState({
	cache,
	defaults
})

const httpLink = createHttpLink({
	uri: 'http://localhost:8000/graphql'
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN)
	return {
		headers: {
			...headers,
			authorization: token ? `JWT ${token}` : ''
		}
	}
})

const client = new ApolloClient({
	link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
	cache: cache
})

const app = (
	<BrowserRouter>
		<ApolloProvider client={client}>
			<Gooseberries />
		</ApolloProvider>
	</BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()