import React from 'react'
import { ApolloProvider } from 'react-apollo'
import client from '../config/apollo'

const withApollo = Component => props => (
  <ApolloProvider client={ client }>
    <Component { ...props } />
  </ApolloProvider>
)

export default withApollo
