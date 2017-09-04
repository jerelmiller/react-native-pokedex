import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import PokemonList from './screens/PokemonList'
import withApollo from './components/withApollo'

const App = StackNavigator({
  Home: {
    screen: withApollo(PokemonList),
    navigationOptions: {
      title: 'Pokedex'
    }
  }
})

export default App
