import React, { Component } from 'react'
import styled from 'styled-components'
import { H3 } from '../../../components/Typography';
import { TitleBlock } from '../../../components/TitleBlock';
import { TextInput, Label } from '../../../components/Form/Inputs';

const AddGameFormWrapper = styled.div `
  margin-bottom: 80px;
  box-sizing: border-box;
`
export class AddPlayerForm extends Component {
  render () {
    return (
      <AddGameFormWrapper>
        <TitleBlock>
          Add a player
        </TitleBlock>
        <Label>Full name</Label>
        <TextInput
          placeholder="Thomas Robertson"
          value={this.props.state.fullName}
          onChange={ (e) => this.props.onChange ('fullName', e.target.value) }
        />
        <Label>Email address</Label>
        <TextInput
          placeholder="thomas@cardinalsolutions.com"
          type="email"
          value={this.props.state.emailAddress}
          onChange={ (e) => this.props.onChange ('emailAddress', e.target.value) }
        />
        <Label>Profile photo URL</Label>
        <TextInput
          placeholder="https://imgur.com/xxxxx"
          type="url"
          value={this.props.state.profilePhoto}
          onChange={ (e) => this.props.onChange ('profilePhoto', e.target.value) }
        />
      </AddGameFormWrapper>
    )
  }
}