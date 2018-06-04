import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import themes from '../lib/themes'
import { StyleSheet, TouchableOpacity } from 'react-native'

const Container = styled.View`
  align-items: center;
  background-color: #4caf50;
  padding: 15px;
  border-color: white;
  border-width: 1px;

  background-color: ${({ type, theme }) => theme[type].primary};
`

const PokemonImage = styled.Image`
  width: 100px;
  height: 100px;
`

const Name = styled.Text`
  color: ${({ type, theme }) => theme[type].text};
`

const PokemonCard = ({ pokemon, style, onPress }) => (
  <Container type={pokemon.types[0]} style={style}>
    <TouchableOpacity onPress={onPress}>
      <PokemonImage source={{ uri: pokemon.image }} />
    </TouchableOpacity>
    <Name type={pokemon.types[0]}>{`${pokemon.number}: ${pokemon.name}`}</Name>
  </Container>
)

PokemonCard.fragments = {
  pokemon: gql`
    fragment PokemonCard on Pokemon {
      id
      number
      name
      image
      types
    }
  `
}

export default PokemonCard
