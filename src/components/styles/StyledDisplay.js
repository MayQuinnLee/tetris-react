import styled from "styled-components";

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 10px 15px;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  background: #fff;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: ${(props) => props.color};
`;

export const StyledButton = styled.button`
  box-sizing: border-box;
  margin: 10px 15px;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #333;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;
