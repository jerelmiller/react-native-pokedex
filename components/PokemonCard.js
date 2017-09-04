import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { gql } from 'react-apollo'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4CAF50',
    padding: 10
  }
})

const PokemonCard = ({ pokemon, style }) => (
  <View style={ [styles.container, style] }>
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
