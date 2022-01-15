import styled from "styled-components";

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  cursor: pointer;

  h1 {
    margin: 20px;
    font-size: 5em;
    font-weight: bold;
    color: blue;
  }
  h2 {
    margin: 20px;
    font-size: 3em;
    font-weight: bold;
    color: blue;
  }
  h1:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

export default Title;
