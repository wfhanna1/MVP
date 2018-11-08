import React, { Component } from "react";
import styled from "styled-components";
import { ProfilePicture } from "../../../components/ProfilePicture";
import { SecondaryButton } from "../../../components/Actions/Secondary";

const PlayerCardWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (min-width: 700px) {
    padding: 0px;
  }
`;

const PlayerProfilePicture = styled.div`
  position: relative;
  margin-right: 20px;
`;

const PlayerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const PlayerTitle = styled.p`
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

const PlayerSubtitle = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: #686868;
  margin: 0px 0px 5px 0;
  padding: 0px;
`;

const PlayerActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & *:first-child {
    margin: 10px 0 10px 0;
  }

  @media (min-width: 700px) {
    flex-direction: row;
    align-items: center;

    & *:first-child {
      margin: 0px 20px 0 0;
    }
  }
`;

const IsWinnerText = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  padding: 0px;
  color: #2e2e2e;
  margin: 0px;
`;

export class PlayerCard extends Component {
  constructor(props) {
    super(props);

    this.onSetWinner = this.onSetWinner.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.renderWinnerButton = this.renderWinnerButton.bind(this);
  }

  onSetWinner = e => {
    e.preventDefault();
    this.props.onChange("winnerId", this.props.player.id);
  };

  onDelete = e => {
    e.preventDefault();
    this.props.onDelete(this.props.player);
  };

  renderWinnerButton = () => {
    if (this.props.isWinner) return <IsWinnerText>🎉 Winner!</IsWinnerText>;
    else
      return (
        <SecondaryButton inverted="true" onClick={e => this.onSetWinner(e)}>
          Set as winner
        </SecondaryButton>
      );
  };

  render() {
    return (
      <PlayerCardWrapper>
        <PlayerProfilePicture>
          <ProfilePicture
            src={this.props.player.profilePhoto}
            selected={this.props.isWinner}
          />
        </PlayerProfilePicture>
        <PlayerText>
          <PlayerTitle>{this.props.player.fullName}</PlayerTitle>
          {this.props.predicition ? (
            <PlayerSubtitle>{`${
              this.props.predicition
            }% chance of winning`}</PlayerSubtitle>
          ) : (
            ""
          )}
          {this.props.actionsVisible ? (
            <PlayerActions>
              <SecondaryButton danger="true" onClick={e => this.onDelete(e)}>
                Remove
              </SecondaryButton>
              {this.renderWinnerButton()}
            </PlayerActions>
          ) : (
            ""
          )}
        </PlayerText>
      </PlayerCardWrapper>
    );
  }
}
