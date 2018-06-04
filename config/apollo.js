import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'https://phoenix-pokedex.herokuapp.com'
})

export default client
