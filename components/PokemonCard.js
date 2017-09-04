import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { gql } from 'react-apollo'
import themes from '../lib/themes'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4CAF50',
    padding: 10
  },
  image: {
    height: 100,
    width: 100
  }
})

const themePrimary = type => themes[type].primary
const themeText = type => themes[type].text

const containerTheme = type => ({
  backgroundColor: themePrimary(type)
})

const PokemonCard = ({ pokemon, style }) => (
  <View style={ [styles.container, style, containerTheme(pokemon.types[0])] }>
    <Image
      style={ styles.image }
      source={{ uri: pokemon.image }}
    />
    <Text>{ `${pokemon.id} - ${pokemon.name}` }</Text>
  </View>
)

PokemonCard.fragments = {
  pokemon: gql`
    fragment PokemonCard on Pokemon {
      id
      name
      image
      types
    }
  `
}

export default PokemonCard
