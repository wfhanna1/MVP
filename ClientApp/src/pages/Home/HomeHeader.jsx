import React, { Component } from "react";
import styled from "styled-components";
import { H1, H2 } from "../../components/Typography";
import { PrimaryLink } from "../../components/Actions/Primary";
import { SecondaryLink } from "../../components/Actions/Secondary";

const HomeHeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
  overflow: hidden;
  box-sizing: border-box;
  min-height: 476px;

  @media (min-width: 700px) {
    padding: 80px 80px;
  }
`;

const HeaderTitle = styled(H1)`
  text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.2);
`;

const HomeSubtitle = styled(H2)`
  max-width: 350px;
`;

const HeaderBackground = styled.div`
  position: absolute;
  height: 476px;
  top: -30px;
  left: 0;
  z-index: -10;

  @media (min-width: 700px) {
    top: 0px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & * {
    margin-bottom: 20px;
  }

  @media (min-width: 700px) {
    flex-direction: row;

    & * {
      margin-right: 30px;
      margin-bottom: 0px;
    }
  }
`;

export class HomeHeader extends Component {
  render() {
    return (
      <HomeHeaderWrapper>
        <HeaderBackground>
          <svg
            width="1203"
            height="476"
            viewBox="0 0 1203 476"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H1203L0 476V0Z" fill="#7E1587" />
          </svg>
        </HeaderBackground>
        <HeaderTitle>Sclask</HeaderTitle>
        <HomeSubtitle>
          Score Core Leading Accelerator and Scribe for Klask®™
        </HomeSubtitle>
        <HeaderActions>
          <PrimaryLink to="/admin/match">Record Match</PrimaryLink>
          <SecondaryLink to="/admin">Admin</SecondaryLink>
        </HeaderActions>
      </HomeHeaderWrapper>
    );
  }
}
