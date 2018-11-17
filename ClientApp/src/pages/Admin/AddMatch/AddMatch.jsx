import React, { Component } from "react";
import styled from "styled-components";
import { PrimaryLayout } from "../../../layouts/PrimaryLayout";
import { LoadingOverlay } from "../../../components/LoadingOverlay";
import { SecondaryLink } from "../../../components/Actions/Secondary";
import { PrimaryButton } from "../../../components/Actions/Primary";
import { AddMatchForm } from "./AddMatchForm";
import { PlayerService } from "../../../services/PlayerService";
import { GameService } from "../../../services/GameService";
import { RatingService } from "../../../services/RatingService";
import { Match } from "../../../models/Match";
import { MatchService } from "../../../services/MatchService";

const AddMatchActions = styled.div`
  width: 100%;
  display: flex;

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
`;

export class AddMatch extends Component {
  playerService = new PlayerService();
  gameService = new GameService();
  ratingsService = new RatingService();
  matchService = new MatchService();

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      gameId: 0,
      loserId: 0,
      winnerId: 0,
      games: [],
      selectedPlayers: [],
      predicitions: {}
    };

    this.getGames = this.getGames.bind(this);
    this.getRatings = this.getRatings.bind(this);
    this.setPredicitions = this.setPredicitions.bind(this);
    this.onChange = this.onChange.bind(this);

    this.getGames();
  }

  async getInitialData() {
    this.setState({
      loading: true
    });

    await this.getGames();

    this.setState({
      loading: false
    });
  }

  onAddPlayer = query =>
    this.props.history.push({
      pathname: "/admin/player",
      state: {
        name: query,
        redirect: "/admin/match"
      }
    });

  onChange(key, value) {
    this.setState({
      [key]: value
    });

    switch (key) {
      case "gameId":
        this.getRatings(value);
        break;
      case "selectedPlayers":
        this.setPredicitions({ players: value });
        break;
    }
  }

  onValidate = () => {
    const messages = [];

    if (!this.state.gameId) messages.push("A game type must be selected.");
    if (this.state.selectedPlayers.length != 2)
      messages.push("2 players must be part of the game.");
    if (!this.state.winnerId) messages.push("A winner must be declared!");

    return messages;
  };

  async onSubmit(e) {
    e.preventDefault();

    const messages = this.onValidate();
    if (messages.length > 0) {
      alert(messages[0]);
      return;
    }

    this.setState({
      loading: true
    });

    const match = new Match({
      gameId: this.state.gameId,
      playerAId: this.state.selectedPlayers[0].id,
      playerBId: this.state.selectedPlayers[1].id,
      winnerId: this.state.winnerId
    });

    try {
      await this.matchService.create(match);
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

  getRatings = async (gameId = this.state.gameId) => {
    const ratings = await this.ratingsService.findByGame(gameId);
    this.setState({
      ratings: ratings
    });
    if (this.state.selectedPlayers.length >= 2)
      this.setPredicitions({ ratings: ratings });
  };

  getGames = async () =>
    this.setState({ games: await this.gameService.read() });

  setPredicitions = ({
    ratings = this.state.ratings,
    players = this.state.selectedPlayers
  } = {}) => {
    if (!players || players.length !== 2 || !ratings) {
      this.setState({
        predicitions: {}
      });
      return;
    }
    const playerARating = ratings.find(r => r.playerId == players[0].id);
    const playerAScore = playerARating ? playerARating.score : 2400;
    const playerBRating = ratings.find(r => r.playerId == players[1].id);
    const playerBScore = playerBRating ? playerBRating.score : 2400;

    const playerAT = this.transformRating(playerAScore);
    const playerBT = this.transformRating(playerBScore);
    this.setState({
      predicitions: {
        [players[0].id]: ((playerAT / (playerAT + playerBT)) * 100).toFixed(2),
        [players[1].id]: ((playerBT / (playerBT + playerAT)) * 100).toFixed(2)
      }
    });
  };

  transformRating = score => Math.pow(10, score / 400);

  render() {
    return (
      <PrimaryLayout>
        <LoadingOverlay visible={this.state.loading} />
        <AddMatchForm
          state={{
            gameId: this.state.gameId,
            loserId: this.state.loserId,
            winnerId: this.state.winnerId,
            selectedPlayers: this.state.selectedPlayers
          }}
          games={this.state.games}
          onChange={this.onChange}
          predicitions={this.state.predicitions}
          onAddPlayer={e => this.onAddPlayer(e)}
        />
        <AddMatchActions>
          <div>
            <SecondaryLink inverted="true" to="/">
              Cancel
            </SecondaryLink>
          </div>
          <div>
            <PrimaryButton inverted="true" onClick={e => this.onSubmit(e)}>
              Record Match
            </PrimaryButton>
          </div>
        </AddMatchActions>
      </PrimaryLayout>
    );
  }
}
