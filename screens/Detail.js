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

const Stat = ({ animation, amount, name }) => (
  <StatContainer>
    <StatName>{name}</StatName>
    <StatAmount
      style={{
        width: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, (amount / MAX_STAT_VALUE) * STAT_WIDTH]
        })
      }}
    />
  </StatContainer>
)

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.primary};
`

class PokemonDetail extends Component {
  static fragments = {
    pokemonHeader: gql`
      fragment PokemonHeader_pokemon on Pokemon {
        id
        name
        types
      }
    `
  }

  static navigationOptions = ({
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

  hpAnimation = new Animated.Value(0)
  attackAnimation = new Animated.Value(0)
  defenseAnimation = new Animated.Value(0)
  spAtkAnimation = new Animated.Value(0)
  spDefAnimation = new Animated.Value(0)
  speedAnimation = new Animated.Value(0)

  componentDidMount() {
    const { navigation } = this.props

    navigation.addListener('didFocus', () => {
      Animated.stagger(75, [
        Animated.parallel([
          Animated.spring(this.speedAnimation, { toValue: 1 }),
          Animated.spring(this.spDefAnimation, { toValue: 1 })
        ]),
        Animated.parallel([
          Animated.spring(this.spAtkAnimation, { toValue: 1 }),
          Animated.spring(this.hpAnimation, { toValue: 1 })
        ]),
        Animated.parallel([
          Animated.spring(this.attackAnimation, { toValue: 1 }),
          Animated.spring(this.defenseAnimation, { toValue: 1 })
        ])
      ]).start()
    })
  }

  render() {
    const { navigation } = this.props

    return (
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
                    <Stat
                      animation={this.hpAnimation}
                      name="HP"
                      amount={pokemon.hp}
                    />
                    <Stat
                      animation={this.attackAnimation}
                      name="Attack"
                      amount={pokemon.attack}
                    />
                    <Stat
                      animation={this.defenseAnimation}
                      name="Defense"
                      amount={pokemon.defense}
                    />
                    <Stat
                      animation={this.spAtkAnimation}
                      name="Sp. Atk"
                      amount={pokemon.specialAttack}
                    />
                    <Stat
                      animation={this.spDefAnimation}
                      name="Sp. Def"
                      amount={pokemon.specialDefense}
                    />
                    <Stat
                      animation={this.speedAnimation}
                      name="Speed"
                      amount={pokemon.speed}
                    />
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
  }
}

export default PokemonDetail
