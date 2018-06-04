import React from 'react'
import gql from 'graphql-tag'
import ScreenLoader from '../components/ScreenLoader'
import Pokeball from '../components/Pokeball'
import PokemonCard from '../components/PokemonCard'
import styled, { ThemeProvider } from 'styled-components'
import themes from '../lib/themes'
import { Query } from 'react-apollo'
import { View, Text } from 'react-native'
import { rgba } from 'polished'

const BannerContainer = styled.View`
  padding: 15px;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary};
`

const EvolutionContainer = styled.View`
  flex-direction: row;
`

const Banner = ({ children }) => (
  <BannerContainer>
    <BannerText>{children}</BannerText>
  </BannerContainer>
)

const BannerText = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`

const Container = styled.ScrollView`
  flex: 1;
`

const PokemonImage = styled.Image`
  margin-vertical: 10px;
  height: 200px;
  width: 200px;
`

const Box = styled.View`
  padding: 10px;
`

const ImageContainer = Box.extend`
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
            ...PokemonCard
            ...PokemonHeader_pokemon
          }
        }
      }

      ${PokemonCard.fragments.pokemon}
      ${PokemonDetail.fragments.pokemonHeader}
    `}
    variables={{ id: navigation.state.params.pokemon.id }}
  >
    {({ loading, data: { pokemon } }) =>
      loading ? (
        <ScreenLoader loading={true} />
      ) : (
        <ThemeProvider
          theme={theme => ({ ...theme[pokemon.types[0]], ...theme })}
        >
          <Container>
            <ImageContainer>
              <Pokeball size="30px" style={{ alignSelf: 'flex-start' }} />
              <PokemonImage source={{ uri: pokemon.image }} />
              <Number type={pokemon.types[0]}>{pokemon.number}</Number>
            </ImageContainer>
            <Banner>{pokemon.types.join(' / ').toUpperCase()}</Banner>
            <Box />
            <Banner>EVOLUTIONS</Banner>
            <EvolutionContainer>
              {pokemon.evolutions.map(evolution => (
                <PokemonCard
                  key={evolution.id}
                  pokemon={evolution}
                  style={{ flex: 1 }}
                  onPress={() =>
                    navigation.push('Detail', { pokemon: evolution })
                  }
                />
              ))}
            </EvolutionContainer>
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
