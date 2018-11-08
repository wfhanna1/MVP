import React, { Component } from "react";
import styled from "styled-components";
import { PlayerCard } from "./PlayerCard";

const SelectedPlayersWrapper = styled.div`
  margin-bottom: 80px;
`;

const SelectedPlayer = styled.div`
  margin-bottom: 20px;
`;

export class SelectedPlayers extends Component {
  constructor(props) {
    super(props);

    this.renderPlayers = this.renderPlayers.bind(this);
  }

  renderPlayers = () =>
    this.props.state.selectedPlayers.map(p => (
      <SelectedPlayer key={p.id}>
        <PlayerCard
          isWinner={p.id == this.props.state.winnerId}
          player={p}
          actionsVisible="true"
          predicition={this.props.predicitions[p.id] || undefined}
          onChange={this.props.onChange}
          onDelete={e => this.props.onDelete(e)}
        />
      </SelectedPlayer>
    ));

  render() {
    return (
      <SelectedPlayersWrapper>{this.renderPlayers()}</SelectedPlayersWrapper>
    );
  }
}
