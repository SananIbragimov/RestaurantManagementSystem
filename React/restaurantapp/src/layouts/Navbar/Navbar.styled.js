import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 12%;
  background-color: #0a131a;
  min-height: 91vh;
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    li {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 5px;
    }
  }
  & > div {
    width: 100%;
    padding: 5px 40px 5px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;

    h3 {
      color: white;
      font-size: 14px;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      margin-left: 10px;
    }
    div {
      width: 90%;
      display: none;
      background-color: black;
      padding: 15px;
      border-radius: 10px;
      cursor: pointer;
      position: absolute;
      top: -20px;
      right: 5px;
    }
    &:hover {
      div {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
`;
export const StyledLink = styled(Link)`
  padding-top: 3px;
  font-size: 15px;
  color: #def2f1;
  text-decoration: none;
  &:hover {
    color: red;
    transition: all 0.4s ease-in;
  }
`;
