import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native'
import { gql, graphql } from 'react-apollo'

const PokemonList = ({ data: { loading, pokemons }}) => (
  <ScrollView style={ styles.container }>
    <ActivityIndicator animating={ loading } size='large' />
    <Text>List view</Text>
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50
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
