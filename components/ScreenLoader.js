import React from 'react'
import styled from 'styled-components'
import { ActivityIndicator } from 'react-native'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const ScreenLoader = props => (
  <Container>
    <ActivityIndicator {...props} size="large" />
  </Container>
)

export default ScreenLoader
