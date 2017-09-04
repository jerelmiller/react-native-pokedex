import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PokemonList = () => (
  <View style={ styles.container }>
    <Text>List view</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50
  }
})

export default PokemonList
