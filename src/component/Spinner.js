import styled, { keyframes } from "styled-components";

function Spinner() {
  return (
    <Wrap>
      <Spin />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const rotation = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Spin = styled.div`
  width: 20px;
  height: 20px;
  border: 5px solid #fdc000;
  border-top-color: transparent;
  border-radius: 50%;
  transform: rotate(0);
  animation: ${rotation} 1s infinite linear;
`;

export default Spinner;
