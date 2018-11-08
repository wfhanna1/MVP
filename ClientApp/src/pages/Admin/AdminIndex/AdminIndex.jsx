import React, { Component } from "react";
import styled from "styled-components";
import { PrimaryLayout } from "../../../layouts/PrimaryLayout";
import { SecondaryLink } from "../../../components/Actions/Secondary";
import { TitleBlock } from "../../../components/TitleBlock";

const AdminIndexLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin: 0 0 20px 0;
  padding: 0;
`;

export class AdminIndex extends Component {
  render() {
    return (
      <PrimaryLayout>
        <TitleBlock>Admin links</TitleBlock>
        <AdminIndexLinkList>
          <ListItem>
            <SecondaryLink to="/admin/game" inverted="true">
              Add Game
            </SecondaryLink>
          </ListItem>
          <ListItem>
            <SecondaryLink to="/admin/match" inverted="true">
              Add Match
            </SecondaryLink>
          </ListItem>
          <ListItem>
            <SecondaryLink to="/admin/player" inverted="true">
              Add Player
            </SecondaryLink>
          </ListItem>
          <ListItem>
            <SecondaryLink to="/" inverted="true">
              Back
            </SecondaryLink>
          </ListItem>
        </AdminIndexLinkList>
      </PrimaryLayout>
    );
  }
}
