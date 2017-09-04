import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import PokemonList from './components/PokemonList'
import client from './config/apollo'

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <PokemonList />
      </ApolloProvider>
    )
  }
}
