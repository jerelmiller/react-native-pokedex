import React from 'react'
import gql from 'graphql-tag'
import { View, Text } from 'react-native'

const PokemonDetail = () => (
  <View>
    <Text>Pokemon</Text>
  </View>
)

PokemonDetail.fragments = {
  pokemonHeader: gql`
    fragment PokemonHeader_pokemon on Pokemon {
      name
      number
      types
    }
  `
}

export default PokemonDetail
