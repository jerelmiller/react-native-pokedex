import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import PokemonList from './screens/PokemonList'
import PokemonDetail from './screens/PokemonDetail'
import withApollo from './components/withApollo'
import themes from './lib/themes'

const App = StackNavigator({
  Home: {
    screen: withApollo(PokemonList),
    navigationOptions: {
      title: 'Pokedex',
      headerStyle: {
        backgroundColor: themes.app.primary
      },
      headerTintColor: themes.app.text
    }
  },
  Detail: {
    screen: withApollo(PokemonDetail),
    navigationOptions: ({ navigation: { state: { params }}}) => ({
      title: params.pokemon.name,
      headerStyle: {
        backgroundColor: themes[params.pokemon.types[0]].primary,
      },
      headerTintColor: themes[params.pokemon.types[0]].text
    })
  }
})

export default App
