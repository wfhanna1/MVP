import React, { Component } from "react";
import styled from "styled-components";
import { ProfilePicture } from "../../components/ProfilePicture";

const HomeRecentGameWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;

  @media (min-width: 700px) {
    padding: 0px;
  }
`;

const RecentGameWinnerProfilePhoto = styled.div`
  position: relative;
  margin-left: -20px;
  margin-right: 20px;
`;

const RecentGameText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const TextGameTitle = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 22px;
  letter-spacing: 0.02em;
  color: #2e2e2e;
  margin: 0 0 5px 0;
  padding: 0px;
`;

const TextGameTime = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: #686868;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
`;

export class HomeRecentGame extends Component {
  getWinner = () =>
    this.props.playerA.id == this.props.winnerId
      ? this.props.playerA
      : this.props.playerB;

  getLoser = () =>
    this.props.playerA.id != this.props.winnerId
      ? this.props.playerA
      : this.props.playerB;

  render() {
    return (
      <HomeRecentGameWrapper>
        <ProfilePicture src={this.getLoser().profilePhoto} />
        <RecentGameWinnerProfilePhoto>
          <ProfilePicture src={this.getWinner().profilePhoto} selected="true" />
        </RecentGameWinnerProfilePhoto>
        <RecentGameText>
          <TextGameTitle>{this.props.game.name}</TextGameTitle>
          <TextGameTime>{this.props.date.toDateString()}</TextGameTime>
        </RecentGameText>
      </HomeRecentGameWrapper>
    );
  }
}
