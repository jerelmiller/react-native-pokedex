import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ApolloClient, ApolloProvider } from 'react-apollo'

const client = new ApolloClient()

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
