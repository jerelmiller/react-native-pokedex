import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'https://phoenix-pokedex.herokuapp.com'
})

const client = new ApolloClient({ networkInterface })

export default client
