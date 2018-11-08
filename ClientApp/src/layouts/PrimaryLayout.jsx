import React, { Component } from 'react'
import styled from 'styled-components'
import { H1, H2 } from '../components/Typography'

const LayoutHeader = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 40px 0;
  padding: 0 20px;
  box-sizing: border-box;

  @media(min-width: 700px) {
    padding: 80px 0px 0 160px;
    margin: 0 0 40px 0;
  }
`

const HeaderTitle = styled (H1) `
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
  color: #7E1587;
  text-align: left;
  width: 350px;
`

const HeaderSubtitle = styled (H2) `
  color: #686868;
  width: 350px;
  text-align: left;
`

const LayoutContent = styled.div `
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  margin: 40px 0;
  
  @media (min-width: 700px) {
    max-width: 600px;
    margin: 40px auto;
  }
`

export class PrimaryLayout extends Component {
  render () {
    return (
      <div>
        <LayoutContent>
          { this.props.children }
        </LayoutContent>
      </div>
    )
  }
}