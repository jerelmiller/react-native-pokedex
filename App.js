import React from 'react'
import client from './config/apollo'
import PokemonList from './screens/PokemonList'
import PokemonDetail from './screens/PokemonDetail'
import themes from './lib/themes'
import { ApolloProvider } from 'react-apollo'
import { StyleSheet, Text, View, YellowBox } from 'react-native'
import { createStackNavigator } from 'react-navigation'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
])

const App = createStackNavigator({
  Home: PokemonList,
  Detail: {
    screen: PokemonDetail,
    navigationOptions: ({
      navigation: {
        state: { params }
      }
    }) => ({
      title: params.pokemon.name,
      headerStyle: {
        backgroundColor: themes[params.pokemon.types[0]].primary
      },
      headerTintColor: themes[params.pokemon.types[0]].text
    })
  }
})

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
