import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View
} from 'react-native'
import { gql, graphql } from 'react-apollo'
import PokemonCard from '../components/PokemonCard'

const PokemonList = ({ data: { loading, pokemons = [] }}) => (
  <View style={ styles.container }>
    <ActivityIndicator animating={ loading } size='large' />
    <ScrollView>
      { pokemons.map(pokemon => (
        <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
      ))}
    </ScrollView>
  </View>
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
      ...PokemonCard
    }
  }
  ${PokemonCard.fragments.pokemon}
`)(PokemonList)
