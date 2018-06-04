import React from 'react'
import { ActivityIndicator, StyleSheet, ScrollView, View } from 'react-native'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import PokemonCard from '../components/PokemonCard'

const Container = styled.View`
  flex: 1;
`

const PokemonList = ({ data: { loading, pokemons = [] }, navigation }) => (
  <Container>
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
  </Container>
)

const styles = StyleSheet.create({
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
