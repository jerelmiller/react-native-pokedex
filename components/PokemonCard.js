import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { gql } from 'react-apollo'
import themes from '../lib/themes'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderColor: 'white',
    borderWidth: 1
  },
  image: {
    height: 100,
    width: 100
  },
  flexContainer: {
    flex: 1,
    alignItems: 'center'
  }
})

const themePrimary = type => themes[type].primary
const themeText = type => themes[type].text

const containerTheme = type => ({
  backgroundColor: themePrimary(type)
})

const textTheme = type => ({
  color: themeText(type)
})

const PokemonCard = ({ pokemon, style, onPress }) => (
  <View style={ [styles.container, style, containerTheme(pokemon.types[0])] }>
    <View style={ styles.flexContainer }>
      <TouchableOpacity onPress={ onPress }>
        <Image
          style={ styles.image }
          source={{ uri: pokemon.image }}
        />
      </TouchableOpacity>
      <Text style={ textTheme(pokemon.types[0]) }>
        { `${pokemon.id} - ${pokemon.name}` }
      </Text>
    </View>
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
