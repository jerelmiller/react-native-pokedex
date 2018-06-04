import React from 'react'
import gql from 'graphql-tag'
import ScreenLoader from '../components/ScreenLoader'
import styled from 'styled-components'
import themes from '../lib/themes'
import { Query } from 'react-apollo'
import { View, Text } from 'react-native'

const Container = styled.View`
  flex: 1;
`

const PokemonImage = styled.Image`
  margin-vertical: 10px;
  height: 200px;
  width: 200px;
`

const ImageContainer = styled.View`
  align-items: center;
`

const PokemonDetail = ({ navigation }) => (
  <Query
    query={gql`
      query DetailQuery($id: ID!) {
        pokemon(id: $id) {
          id
          attack
          defense
          hp
          name
          image
          specialAttack
          specialDefense
          speed
          types

          evolutions {
            id
            number
            types
          }
        }
      }
    `}
    variables={{ id: navigation.state.params.pokemon.id }}
  >
    {({ loading, data: { pokemon } }) =>
      loading ? (
        <ScreenLoader loading={true} />
      ) : (
        <Container>
          <ImageContainer>
            <PokemonImage source={{ uri: pokemon.image }} />
          </ImageContainer>
          <Text>Pokemon</Text>
        </Container>
      )
    }
  </Query>
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
      id
      name
      types
    }
  `
}

export default PokemonDetail
