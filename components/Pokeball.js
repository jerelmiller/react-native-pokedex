import styled from 'styled-components'
import { prop } from '../utils/fp'

const Pokeball = styled.Image.attrs({
  source: require('../images/pokeball.png')
})`
  width: ${prop('size')};
  height: ${prop('size')};
`

export default Pokeball
