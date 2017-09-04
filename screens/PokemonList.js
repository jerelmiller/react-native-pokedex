import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'

const PokemonList = () => (
  <ScrollView style={ styles.container }>
    <Text>List view</Text>
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50
  }
})

export default PokemonList
