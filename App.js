import React from 'react'
import client from './config/apollo'
import PokemonList from './screens/PokemonList'
import PokemonDetail from './screens/PokemonDetail'
import themes from './lib/themes'
import { ApolloProvider } from 'react-apollo'
import { StyleSheet, Text, View, YellowBox } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { createStackNavigator } from 'react-navigation'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
])

const App = createStackNavigator({
  Home: PokemonList,
  Detail: PokemonDetail
})

export default () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={themes}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
)
