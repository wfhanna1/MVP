import React, { Component } from "react";
import styled from "styled-components";
import { HomeHeader } from "./HomeHeader";
import { HomeList } from "./HomeList";
import { HomeRecentGame } from "./HomeRecentGame";
import { H3 } from "../../components/Typography";
import { HomeTopPlayer } from "./HomeTopPlayer";
import { GameService } from "../../services/GameService";
import { MatchService } from "../../services/MatchService";
import { RatingService } from "../../services/RatingService";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { SecondaryA } from "../../components/Actions/Secondary";

const HomeContent = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    max-width: 1200px;
    margin: 0 auto;
    flex-direction: row;
    justify-content: center;

    & * {
      max-width: 250px;
    }
    & ul:first-of-type {
      margin-right: 100px;
    }
  }
`;

const HomeProvideFeedback = styled.div`
  display: none;
  font-family: Open Sans;
  font-size: 14px;
  color: gray;
  position: fixed;
  bottom: 10px;
  right: 10px;
  text-align: right;
  background-color: rgba(255, 255, 255, 1);
  padding: 5px 10px;

  @media (min-width: 700px) {
    display: block;
  }
`;

export class Home extends Component {
  matchService = new MatchService();
  ratingService = new RatingService();

  constructor(props) {
    super(props);

    this.state = {
      recentGames: [],
      topPlayers: [],
      loading: false
    };

    this.getInitialData = this.getInitialData.bind(this);
    this.getRecentGames = this.getRecentGames.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.renderTopPlayer = this.renderTopPlayer.bind(this);

    this.getInitialData();
  }

  getInitialData = async () => {
    this.setState({
      loading: true
    });
    await this.getRecentGames();
    await this.getTopPlayers();
    this.setState({
      loading: false
    });
  };

  getRecentGames = async () =>
    this.setState({
      recentGames: await this.matchService.readRecentMatches()
    });

  getTopPlayers = async () =>
    this.setState({
      topPlayers: await this.ratingService.readTopPlayers()
    });

  renderGame = game => <HomeRecentGame {...game} />;
  renderTopPlayer = player => <HomeTopPlayer {...player} />;

  render() {
    return (
      <div>
        <HomeHeader />
        <HomeContent>
          <LoadingOverlay visible={this.state.loading} />
          <HomeProvideFeedback>
            Give suggestions on{" "}
            <SecondaryA
              href="https://www.notion.so/Sclask-Roadmap-064b1268637d434b85816ec89b1b999e"
              inverted="true"
            >
              Notion
            </SecondaryA>
          </HomeProvideFeedback>
          <HomeList
            items={this.state.recentGames}
            renderer={this.renderGame}
            action={{ text: "Record Match", to: "/admin/match" }}
          >
            <H3>🎮 Recent Games</H3>
          </HomeList>
          <HomeList
            items={this.state.topPlayers}
            renderer={this.renderTopPlayer}
            action={{ text: "Add Player", to: "/admin/player" }}
          >
            <H3>🏆 Top Players</H3>
          </HomeList>
        </HomeContent>
      </div>
    );
  }
}
