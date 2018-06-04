import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import client from './config/apollo'
import PokemonList from './screens/PokemonList'
import PokemonDetail from './screens/PokemonDetail'
import themes from './lib/themes'
import { ApolloProvider } from 'react-apollo'

const App = createStackNavigator({
  Home: {
    screen: PokemonList,
    navigationOptions: {
      title: 'Pokedex',
      headerStyle: {
        backgroundColor: themes.app.primary
      },
      headerTintColor: themes.app.text
    }
  },
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
