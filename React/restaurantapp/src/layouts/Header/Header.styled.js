import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  background-color: #0a131a;
  min-height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

export const StyledHeading2 = styled.h2`
  color: #f6e2ea;
  font-size: 32px;
  font-style: italic;
  padding: 3px;
  letter-spacing: 1px;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: rgba(167, 221, 60, 1);
  text-shadow: 2px 0px 0px rgba(128, 0, 64, 1), 3px 2px 0px rgba(77, 0, 38, 0.5),
    3px 0px 3px rgba(255, 0, 43, 1), 5px 0px 3px rgba(128, 0, 21, 1),
    6px 2px 3px rgba(77, 0, 13, 0.5), 6px 0px 9px rgba(255, 85, 0, 1),
    8px 0px 9px rgba(128, 42, 0, 1), 9px 2px 9px rgba(77, 25, 0, 0.5),
    9px 0px 18px rgba(255, 213, 0, 1), 11px 0px 18px rgba(128, 106, 0, 1),
    12px 2px 18px rgba(77, 66, 0, 0.5), 12px 0px 30px rgba(212, 255, 0, 1),
    14px 0px 30px rgba(106, 128, 0, 1), 15px 2px 30px rgba(64, 77, 0, 0.5),
    15px 0px 45px rgba(128, 255, 0, 1), 17px 0px 45px rgba(64, 128, 0, 1),
    17px 2px 45px rgba(38, 77, 0, 0.5);

  &:hover {
    background-color: #f6e2ea;
    color: #0a131a;
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.9),
      0px 0px 20px rgba(73, 255, 24, 0.9);
    transform: scale(1.01);
  }
`;
