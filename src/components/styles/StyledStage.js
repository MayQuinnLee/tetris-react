import styled from "styled-components";

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(25vw / ${(props) => props.width})
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  /*We want them to be perfect squares*/

  grid-gap: 1.5px;
  border: 2px solid rgb(224, 224, 22);
  width: 100%;
  max-width: 25vw;
  background: #999;
`;
//refer to gameHelper on the grid height and width
