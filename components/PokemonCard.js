import React from 'react'
import { Text, View } from 'react-native'
import { gql } from 'react-apollo'

const PokemonCard = ({ pokemon }) => (
  <View>
    <Text>{ `${pokemon.id} - ${pokemon.name}` }</Text>
  </View>
)

PokemonCard.fragments = {
  pokemon: gql`
    fragment PokemonCard on Pokemon {
      id
      name
    }
  `
}

export default PokemonCard
