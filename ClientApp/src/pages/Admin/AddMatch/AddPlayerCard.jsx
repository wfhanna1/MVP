import React, { Component } from "react";
import styled from "styled-components";
import { ProfilePicture } from "../../../components/ProfilePicture";
import {
  SecondaryButton,
  SecondaryLink
} from "../../../components/Actions/Secondary";

const AddPlayerCardWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (min-width: 700px) {
    padding: 0px;
  }
`;

const AddPlayerCardCircle = styled.div`
  position: relative;
  margin-right: 20px;
  background-color: #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: white;
  border-radius: 50%;
  max-width: 80px;
  min-width: 80px;
  max-height: 80px;
  min-height: 80px;
`;

const AddPlayerCardActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

export class AddPlayerCard extends Component {
  render() {
    return (
      <AddPlayerCardWrapper>
        <AddPlayerCardCircle>+</AddPlayerCardCircle>
        <AddPlayerCardActions>
          <SecondaryLink inverted="true" to="/admin/player">
            Add new player
          </SecondaryLink>
        </AddPlayerCardActions>
      </AddPlayerCardWrapper>
    );
  }
}
