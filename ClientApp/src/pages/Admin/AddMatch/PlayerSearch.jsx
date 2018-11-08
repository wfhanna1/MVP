import React, { Component } from "react";
import styled from "styled-components";
import { TextInput, Label } from "../../../components/Form/Inputs";
import { PlayerService } from "../../../services/PlayerService";
import { PlayerCard } from "./PlayerCard";
import { Player } from "../../../models/Player";

const PlayerSearchWrapper = styled.div``;

const PlayerSearchResuts = styled.div``;

const SearchResult = styled.div`
  padding: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: transform 0.2s;

  :hover {
    transform: translateX(10px);
  }
`;

export class PlayerSearch extends Component {
  playerService = new PlayerService();
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      players: []
    };

    this.renderPlayers = this.renderPlayers.bind(this);
    this.search = this.search.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  async search(query = "") {
    this.setState({
      query: query
    });

    if (query.trim() == "") {
      this.setState({
        players: []
      });
      return;
    }

    let results = await this.playerService.find(query);
    const self = this;
    results = results.filter(
      p => self.props.selectedPlayers.find(sp => sp.id == p.id) === undefined
    );

    this.setState({
      players: results.length > 3 ? results.slize(0, 2) : results
    });
  }

  renderPlayers = () =>
    this.state.players.map(p => (
      <SearchResult key={p.id} onClick={e => this.onSelect(e, p)}>
        <PlayerCard player={p} />
      </SearchResult>
    ));

  onSelect = (e, player) => {
    e.preventDefault();
    if (!player) return;
    this.setState({
      query: "",
      players: []
    });
    this.props.onSelect(player);
  };

  render() {
    return (
      <PlayerSearchWrapper>
        <Label>Add player</Label>
        <TextInput
          value={this.state.query}
          onChange={e => this.search(e.target.value)}
          placeholder="Search by name or email address..."
        />
        <PlayerSearchResuts>{this.renderPlayers()}</PlayerSearchResuts>
      </PlayerSearchWrapper>
    );
  }
}
