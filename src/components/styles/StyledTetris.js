import styled from "styled-components";

import bgImage from "../../assets/img/bg.png";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  align-items: flex-start;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  aside {
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
