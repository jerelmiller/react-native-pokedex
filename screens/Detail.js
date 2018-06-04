import React, { Component } from 'react'
import gql from 'graphql-tag'
import ScreenLoader from '../components/ScreenLoader'
import Pokeball from '../components/Pokeball'
import PokemonCard from '../components/PokemonCard'
import styled, { ThemeProvider } from 'styled-components'
import themes from '../lib/themes'
import { Query } from 'react-apollo'
import { Animated, Dimensions, SafeAreaView, View, Text } from 'react-native'
import { rgba } from 'polished'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const STAT_NAME_WIDTH = 70
const MAX_STAT_VALUE = 250
const BOX_PADDING = 20
const STAT_WIDTH = SCREEN_WIDTH - STAT_NAME_WIDTH - 2 * BOX_PADDING

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
  background-color: white;
`

const PokemonImage = styled.Image`
  margin-vertical: 10px;
  height: 200px;
  width: 200px;
`

const Box = styled.View`
  padding: ${BOX_PADDING}px;
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

const StatContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`

const StatName = styled.Text`
  width: ${STAT_NAME_WIDTH}px;
  padding-right: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  text-align: right;
`

const StatAmount = styled(Animated.View)`
  background-color: ${({ theme }) => theme.primary};
`

class Stat extends Component {
  animatedWidth = new Animated.Value(0)

  componentDidMount() {
    const { amount } = this.props

    Animated.spring(this.animatedWidth, {
      toValue: (amount / MAX_STAT_VALUE) * STAT_WIDTH
    }).start()
  }

  render() {
    const { name } = this.props
    const animatedStyle = { width: this.animatedWidth }

    return (
      <StatContainer>
        <StatName>{name}</StatName>
        <StatAmount style={animatedStyle} />
      </StatContainer>
    )
  }
}

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.primary};
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
          <SafeView>
            <Container>
              <ImageContainer>
                <Pokeball size="30px" style={{ alignSelf: 'flex-start' }} />
                <PokemonImage source={{ uri: pokemon.image }} />
                <Number type={pokemon.types[0]}>{pokemon.number}</Number>
              </ImageContainer>
              <Banner>{pokemon.types.join(' / ').toUpperCase()}</Banner>
              <Box>
                <Stat name="HP" amount={pokemon.hp} />
                <Stat name="Attack" amount={pokemon.attack} />
                <Stat name="Defense" amount={pokemon.defense} />
                <Stat name="Sp. Atk" amount={pokemon.specialAttack} />
                <Stat name="Sp. Def" amount={pokemon.specialDefense} />
                <Stat name="Speed" amount={pokemon.speed} />
              </Box>
              <Banner>EVOLUTIONS</Banner>
              <EvolutionContainer>
                {pokemon.evolutions.map(evolution => (
                  <PokemonCard
                    key={evolution.id}
                    pokemon={evolution}
                    style={{ flex: 1 }}
                    onPress={() =>
                      navigation.replace('Detail', { pokemon: evolution })
                    }
                  />
                ))}
              </EvolutionContainer>
            </Container>
          </SafeView>
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
