import React, { Component } from "react";
import styled from "styled-components";

const ProfilePictureWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  max-width: 70px;
  min-width: 70px;
  max-height: 70px;
  min-height: 70px;
  border-radius: 50%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #dadada;
`;

const ProfilePictureRing = styled.div`
  position: absolute;
  box-sizing: border-box;
  max-width: 80px;
  min-width: 80px;
  max-height: 80px;
  min-height: 80px;
  top: -5px;
  left: -5px;
  border-radius: 50%;
  border: 3px solid #4dc1e4;
  background: transparent;
`;

export class ProfilePicture extends Component {
  render() {
    return (
      <ProfilePictureWrapper
        style={{ backgroundImage: `url("${this.props.src}")` }}
      >
        {this.props.selected ? <ProfilePictureRing /> : ""}
      </ProfilePictureWrapper>
    );
  }
}
