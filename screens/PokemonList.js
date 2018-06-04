import React from 'react'
import { ActivityIndicator, StyleSheet, ScrollView, View } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PokemonCard from '../components/PokemonCard'

const PokemonList = ({ data: { loading, pokemons = [] }, navigation }) => (
  <View style={styles.container}>
    {loading && <ActivityIndicator animating={loading} size="large" />}
    <ScrollView contentContainerStyle={styles.scrollView}>
      {pokemons.map(pokemon => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onPress={() => navigation.navigate('Detail', { pokemon })}
          style={{ width: '50%' }}
        />
      ))}
    </ScrollView>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})

export default graphql(gql`
  query {
    pokemons {
      id
      ...PokemonCard
    }
  }
  ${PokemonCard.fragments.pokemon}
`)(PokemonList)
