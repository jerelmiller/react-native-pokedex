import React from 'react'
import { View, Text } from 'react-native'

const PokemonCard = ({ pokemon }) => (
  <View>
    <Text>{ `${pokemon.id} - ${pokemon.name}` }</Text>
  </View>
)

export default PokemonCard
