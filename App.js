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
    navigationOptions: {
      title: 'The pokemon'
    }
  }
})

export default App
