import styled from "styled-components";
import { Link } from "react-router-dom";

const SecondaryStyle = props => `
  background: transparent;
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
  cursor: pointer;
  padding: 0px;

  ${
    props.danger
      ? "color: #FA709A"
      : props.inverted
      ? "color: #7E1587"
      : "color: white"
  }

  :hover {
    opacity: 0.8;
  }
`;

export const SecondaryLink = styled(Link)`
  ${props => SecondaryStyle(props)}
`;

export const SecondaryA = styled.a`
  ${props => SecondaryStyle(props)}
`;

export const SecondaryButton = styled.button`
  ${props => SecondaryStyle(props)}
`;
