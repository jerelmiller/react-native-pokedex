import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import PokemonCard from '../components/PokemonCard'
import themes from '../lib/themes'
import { ActivityIndicator, StyleSheet, ScrollView, View } from 'react-native'
import { Query } from 'react-apollo'

const Container = styled.View`
  flex: 1;
`

const PokemonList = ({ navigation }) => (
  <Query
    query={gql`
      query {
        pokemons {
          id
          ...PokemonCard
        }
      }
      ${PokemonCard.fragments.pokemon}
    `}
  >
    {({ loading, data: { pokemons } }) => (
      <Container>
        {loading ? (
          <ActivityIndicator animating={loading} size="large" />
        ) : (
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
        )}
      </Container>
    )}
  </Query>
)

PokemonList.navigationOptions = {
  title: 'Pokedex',
  headerStyle: {
    backgroundColor: themes.app.primary
  },
  headerTintColor: themes.app.text
}

const styles = StyleSheet.create({
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})

export default PokemonList
