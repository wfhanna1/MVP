import React, { Component } from "react";
import styled from "styled-components";
import { PrimaryLayout } from "../../../layouts/PrimaryLayout";
import { SecondaryLink } from "../../../components/Actions/Secondary";
import { PrimaryButton } from "../../../components/Actions/Primary";
import { LoadingOverlay } from "../../../components/LoadingOverlay";
import { AddGameForm } from "./AddGameForm";
import { Game } from "../../../models/Game";
import { GameService } from "../../../services/GameService";

const AddGameActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
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
`;

export class AddGame extends Component {
  gameService = new GameService();

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: "",
      kFactor: 32
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValidate() {
    const messages = [];

    if (this.state.name.trim().length < 0) messages.push("A name is required.");
    if (
      this.state.kFactor == undefined ||
      this.state.kFactor < 1 ||
      this.state.kFactor > 128
    )
      messages.push("K Factor must be 1-128");

    return messages;
  }

  onChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  async onSubmit() {
    const messages = this.onValidate();
    if (messages.length > 0) {
      alert(messages[0]);
      return;
    }

    this.setState({
      loading: true
    });

    const game = new Game({
      name: this.state.name,
      kFactor: this.state.kFactor
    });

    try {
      await this.gameService.create(game);
      this.props.history.push("/");
      return;
    } catch (e) {
      alert(`An error has occurred, please try again later`);
      console.log(e.message);
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <PrimaryLayout>
        <LoadingOverlay visible={this.state.loading} />
        <AddGameForm
          state={{
            name: this.state.name,
            kFactor: this.state.kFactor
          }}
          onChange={this.onChange}
        />
        <AddGameActions>
          <div>
            <SecondaryLink inverted="true" to="/">
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
        </AddGameActions>
      </PrimaryLayout>
    );
  }
}
