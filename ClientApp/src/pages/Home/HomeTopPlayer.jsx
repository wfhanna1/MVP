import React, { Component } from "react";
import styled from "styled-components";
import { ProfilePicture } from "../../components/ProfilePicture";

const HomeTopPlayerWrapper = styled.div`
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

const TopPlayerProfilePicture = styled.div`
  position: relative;
  margin-right: 20px;
`;

const TopPlayerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const TextPoints = styled.p`
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

const TextPointsHighlighted = styled.span`
  color: #7e1587;
  font-weight: 600;
`;

const TextTotalGames = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: #686868;
  margin: 0px;
  padding: 0px;
`;

export class HomeTopPlayer extends Component {
  render() {
    return (
      <HomeTopPlayerWrapper>
        <TopPlayerProfilePicture>
          <ProfilePicture
            src={this.props.player.profilePhoto}
            name={this.props.player.fullName}
          />
        </TopPlayerProfilePicture>
        <TopPlayerText>
          <TextPoints>
            <TextPointsHighlighted>
              {this.props.average.toFixed(2)}{" "}
            </TextPointsHighlighted>
            points
          </TextPoints>
          <TextTotalGames>{`${this.props.games} games played`}</TextTotalGames>
        </TopPlayerText>
      </HomeTopPlayerWrapper>
    );
  }
}
