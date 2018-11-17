import React, { Component } from "react";
import styled from "styled-components";
import { TitleBlock } from "../../../components/TitleBlock";
import { Label, SelectInput } from "../../../components/Form/Inputs";
import { PlayerSearch } from "./PlayerSearch";
import { SelectedPlayers } from "./SelectedPlayers";

const AddMatchFormWrapper = styled.div`
  margin-bottom: 80px;
  box-sizing: border-box;
`;

export class AddMatchForm extends Component {
  constructor(props) {
    super(props);

    this.onPlayerSelected = this.onPlayerSelected.bind(this);
    this.renderGameOptions = this.renderGameOptions.bind(this);
  }

  onPlayerSelected = e => {
    const players = Object.assign([], this.props.state.selectedPlayers);
    players.push(e);
    this.props.onChange("selectedPlayers", players);
  };

  onPlayerDeleted = e => {
    const players = this.props.state.selectedPlayers;
    players.splice(players.find(p => p.id == e.id), 1);
    this.props.onChange("selectedPlayers", players);
  };

  renderGameOptions = () =>
    this.props.games.map(g => (
      <option value={g.id} key={g.id}>
        {g.name}
      </option>
    ));

  render() {
    return (
      <AddMatchFormWrapper>
        <TitleBlock>New match!</TitleBlock>
        <SelectedPlayers
          state={{
            selectedPlayers: this.props.state.selectedPlayers,
            winnerId: this.props.state.winnerId,
            loserId: this.props.state.loserId
          }}
          predicitions={this.props.predicitions}
          onChange={this.props.onChange}
          onDelete={e => this.onPlayerDeleted(e)}
        />
        <Label>Game type</Label>
        <SelectInput
          defaultValue="-1"
          onChange={e => this.props.onChange("gameId", e.target.value)}
        >
          <option disabled value="-1">
            Select a game type
          </option>
          {this.renderGameOptions()}
        </SelectInput>
        {this.props.state.selectedPlayers.length >= 2 ? (
          ""
        ) : (
          <PlayerSearch
            selectedPlayers={this.props.state.selectedPlayers}
            onSelect={e => this.onPlayerSelected(e)}
            onAddPlayer={e => this.props.onAddPlayer(e)}
          />
        )}
      </AddMatchFormWrapper>
    );
  }
}
