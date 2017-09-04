import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native'
import { gql, graphql } from 'react-apollo'

const PokemonList = ({ data: { loading, pokemons = [] }}) => (
  <ScrollView style={ styles.container }>
    <ActivityIndicator animating={ loading } size='large' />
    { pokemons.map(pokemon => (
      <View key={ pokemon.id }>
        <Text>{ `${pokemon.id} - ${pokemon.name}` }</Text>
      </View>
    ))}
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default graphql(gql`
  query {
    pokemons {
      id
      name
    }
  }
`)(PokemonList)