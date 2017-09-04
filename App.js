import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import PokemonList from './screens/PokemonList'
import PokemonDetail from './screens/PokemonDetail'
import withApollo from './components/withApollo'
import themes from './lib/themes'

const styles = StyleSheet.create({
  header: {
    backgroundColor: themes.app.primary
  }
})

const App = StackNavigator({
  Home: {
    screen: withApollo(PokemonList),
    navigationOptions: {
      title: 'Pokedex',
      headerStyle: styles.header,
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
