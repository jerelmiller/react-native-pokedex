import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import themes from '../lib/themes'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Container = styled.View`
  background-color: #4caf50;
  padding: 15px;
  border-color: white;
  border-width: 1px;

  background-color: ${({ type, theme }) => theme[type].primary};
`

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100
  },
  flexContainer: {
    flex: 1,
    alignItems: 'center'
  }
})

const themeText = type => themes[type].text

const textTheme = type => ({
  color: themeText(type)
})

const PokemonCard = ({ pokemon, style, onPress }) => (
  <Container type={pokemon.types[0]} style={style}>
    <View style={styles.flexContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.image} source={{ uri: pokemon.image }} />
      </TouchableOpacity>
      <Text style={textTheme(pokemon.types[0])}>
        {`${pokemon.id} - ${pokemon.name}`}
      </Text>
    </View>
  </Container>
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
