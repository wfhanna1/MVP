import styled from 'styled-components'
import { Link } from 'react-router-dom'

const PrimaryStyle = (props) => `
  background: ${ props.inverted ? '#7E1587' : 'white' };
  color: ${ props.inverted ? 'white': '#2E2E2E' }
  border-radius: 4px;
  border-style: none;
  font-size: 16px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  transition: all 0.2s;
  text-decoration: none;
  padding: 12px 30px;
  cursor: pointer;

  :hover {
    transform: translateY(-1px);
    box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`

export const PrimaryLink = styled (Link) `
  ${ (props) => PrimaryStyle (props) }
`

export const PrimaryA = styled.a `
  ${ (props) => PrimaryStyle (props) }
`

export const PrimaryButton = styled.button `
  ${ (props) => PrimaryStyle (props) }
`