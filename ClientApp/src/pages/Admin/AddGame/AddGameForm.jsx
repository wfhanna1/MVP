import React, { Component } from "react";
import styled from "styled-components";
import { TitleBlock } from "../../../components/TitleBlock";
import { TextInput, Label } from "../../../components/Form/Inputs";

const AddGameFormWrapper = styled.div`
  margin-bottom: 80px;
  box-sizing: border-box;
`;
export class AddGameForm extends Component {
  render() {
    return (
      <AddGameFormWrapper>
        <TitleBlock>Add a new game</TitleBlock>
        <Label>Game name</Label>
        <TextInput
          placeholder="Klask"
          value={this.props.state.name}
          onChange={e => this.props.onChange("name", e.target.value)}
        />
        <Label>K modifier</Label>
        <TextInput
          placeholder="32"
          type="number"
          min="1"
          max="128"
          value={this.props.state.kFactor}
          onChange={e =>
            this.props.onChange("kFactor", parseInt(e.target.value))
          }
        />
      </AddGameFormWrapper>
    );
  }
}
