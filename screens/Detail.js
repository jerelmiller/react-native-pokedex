import React from 'react'
import gql from 'graphql-tag'
import ScreenLoader from '../components/ScreenLoader'
import Pokeball from '../components/Pokeball'
import styled, { ThemeProvider } from 'styled-components'
import themes from '../lib/themes'
import { Query } from 'react-apollo'
import { View, Text } from 'react-native'
import { rgba } from 'polished'

const Container = styled.View`
  flex: 1;
`

const PokemonImage = styled.Image`
  margin-vertical: 10px;
  height: 200px;
  width: 200px;
`

const ImageContainer = styled.View`
  padding: 10px;
  align-items: center;

  background-color: ${({ theme }) => rgba(theme.primary, 0.3)};
`

const Number = styled.Text`
  align-self: flex-end;
  color: ${({ theme }) => theme.text};
  font-size: 15px;
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
          number
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
        <ThemeProvider theme={theme => theme[pokemon.types[0]]}>
          <Container>
            <ImageContainer>
              <Pokeball size="30px" style={{ alignSelf: 'flex-start' }} />
              <PokemonImage source={{ uri: pokemon.image }} />
              <Number type={pokemon.types[0]}>{pokemon.number}</Number>
            </ImageContainer>
          </Container>
        </ThemeProvider>
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
