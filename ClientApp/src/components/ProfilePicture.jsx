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
  background-color: #fbab7e;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  font-family: "Open Sans";
  font-weight: bold;
  z-index: 1;
`;

const ProfilePictureImage = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 2;
  border-radius: 50%;
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
  z-index: 3;
`;

export class ProfilePicture extends Component {
  constructor(props) {
    super(props);

    this.getInitials = this.getInitials.bind(this);
  }

  getInitials = () =>
    this.props.name
      ? this.props.name
          .split(" ")
          .filter((x, i) => i <= 1)
          .map(x => x[0])
          .join("")
      : "";
  render() {
    return (
      <ProfilePictureWrapper>
        {this.getInitials()}
        {this.props.selected ? <ProfilePictureRing /> : ""}
        <ProfilePictureImage
          style={{ backgroundImage: `url("${this.props.src}")` }}
        />
      </ProfilePictureWrapper>
    );
  }
}
