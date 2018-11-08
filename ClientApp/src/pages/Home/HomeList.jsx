import React, { Component } from 'react'
import styled from 'styled-components'
import { SecondaryLink } from '../../components/Actions/Secondary';

const HomeListWrapper = styled.ul `
  list-style: none;
  width: 100%;
  margin: 0 0 40px 0;
  padding: 0;

  @media(min-width: 700px) {
    margin-bottom: 0px;
  }
`

const HomeListItem = styled.li `
  list-style: none;
  margin: 0 0 20px 0;
  padding: 0;
`

const HomeListAction = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`

export class HomeList extends Component {
  render () {
    return (
      <HomeListWrapper>
        <li>
          { this.props.children }
        </li>
        {
          this.props.items ?
            this.props.items.map(i => 
              <HomeListItem>
                { this.props.renderer (i) }
              </HomeListItem>
            )
          :
              ''
        }
        <li>
          <HomeListAction>
            <SecondaryLink 
              to={ this.props.action.to } 
              inverted="true"
            >
              { this.props.action.text }
            </SecondaryLink>
          </HomeListAction>
        </li>
      </HomeListWrapper>
    )
  }
}