import React from 'react'
import gql from 'graphql-tag'
import themes from '../lib/themes'
import { View, Text } from 'react-native'

const PokemonDetail = () => (
  <View>
    <Text>Pokemon</Text>
  </View>
)

PokemonDetail.navigationOptions = ({
  navigation: {
    state: { params }
  }
}) => ({
  title: params.pokemon.name,
  headerStyle: {
    backgroundColor: themes[params.pokemon.types[0]].primary
  },
  headerTintColor: themes[params.pokemon.types[0]].text
})

PokemonDetail.fragments = {
  pokemonHeader: gql`
    fragment PokemonHeader_pokemon on Pokemon {
      name
      types
    }
  `
}

export default PokemonDetail
