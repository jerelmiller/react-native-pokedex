import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import themes from '../lib/themes'
import { StyleSheet, TouchableOpacity } from 'react-native'

const Pokeball = styled.Image.attrs({
  source: require('../images/pokeball.png')
})`
  width: 20px;
  height: 20px;
  align-self: flex-start;
`

const Container = styled.View`
  align-items: center;
  background-color: #4caf50;
  padding: 10px;
  border-color: white;
  border-width: 1px;

  background-color: ${({ type, theme }) => theme[type].primary};
`

const PokemonImage = styled.Image`
  margin-vertical: 15px;
  width: 100px;
  height: 100px;
`

const Name = styled.Text`
  align-self: flex-end;
  font-weight: bold;
  font-size: 12px;
  color: ${({ type, theme }) => theme[type].text};
`

const PokemonCard = ({ pokemon, style, onPress }) => (
  <Container type={pokemon.types[0]} style={style}>
    <Pokeball />
    <TouchableOpacity onPress={onPress}>
      <PokemonImage source={{ uri: pokemon.image }} />
    </TouchableOpacity>
    <Name type={pokemon.types[0]}>{pokemon.number}</Name>
  </Container>
)

PokemonCard.fragments = {
  pokemon: gql`
    fragment PokemonCard on Pokemon {
      id
      number
      image
      types
    }
  `
}

export default PokemonCard
