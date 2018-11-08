import React, { Component } from 'react'
import styled from 'styled-components'
import { PrimaryLayout } from '../../../layouts/PrimaryLayout';
import { SecondaryLink } from '../../../components/Actions/Secondary';
import { PrimaryButton } from '../../../components/Actions/Primary';
import { LoadingOverlay } from '../../../components/LoadingOverlay';
import { AddPlayerForm } from './AddPlayerForm';
import { Player } from '../../../models/Player';
import { PlayerService } from '../../../services/PlayerService';
import { ValidationService } from '../../../services/ValidationService';

const AddPlayerActions = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;

  @media(min-width: 700px) {
    flex-direction: row;

    & div:first-child {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 1;
    }

    & div:last-child {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
    }
  }
`

export class AddPlayer extends Component {
  playerService = new PlayerService ()

  constructor (props) {
    super (props)

    this.state = {
      loading: false,
      fullName: '',
      emailAddress: '',
      profilePhoto: ''
    }

    this.onChange = this.onChange.bind (this)
    this.onSubmit = this.onSubmit.bind (this)
  }

  onValidate () {
    const messages = []

    if (!ValidationService.nonEmptyString (this.state.fullName)) messages.push ('A name is required.')
    if (this.state.fullName.length > 255) messages.push ('Full name must be < 255 characters')
    if (!ValidationService.email (this.state.emailAddress)) messages.push ('Enter a valid email address')
    if (ValidationService.nonEmptyString (this.state.profilePhoto) && !ValidationService.url (this.state.profilePhoto)) {
      messages.push ('Profile photo URL is invalid')
    } 

    return messages
  }

  onChange (key, value) {
    this.setState ({
      [key]: value
    })
  } 

  async onSubmit () {
    const messages = this.onValidate ()
    if (messages.length > 0) {
      alert (messages [0])
      return
    }

    this.setState ({
      loading: true
    })

    const player = new Player ({
      fullName: this.state.fullName,
      emailAddress: this.state.emailAddress,
      profilePhoto: this.state.profilePhoto.length > 0 ? this.state.profilePhoto : null
    })

    try {
      await this.playerService.create (player)
      this.props.history.push ('/')
      return
    } catch (e) {
      alert (`An error has occurred, please try again later`)
      console.log (e.message)
      this.setState ({
        loading: false
      })
    }
  }

  render () {
    return (
      <PrimaryLayout>
        <LoadingOverlay visible={this.state.loading} />
        <AddPlayerForm
          state={{
            fullName: this.state.fullName,
            emailAddress: this.state.emailAddress,
            profilePhoto: this.state.profilePhoto
          }}
          onChange={this.onChange}
        />
        <AddPlayerActions>
          <div>
            <SecondaryLink
              inverted="true"
              to="/"
            >
              Cancel
            </SecondaryLink>
          </div>
          <div>
            <PrimaryButton
              inverted="true"
              onClick={this.onSubmit}
              disabled={this.loading}
            >
              Save
            </PrimaryButton>
          </div>
        </AddPlayerActions>
      </PrimaryLayout>
    )
  }
}