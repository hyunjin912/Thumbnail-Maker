import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import Maker from "../component/Maker";

function Thumbnail() {
  const { thumbId } = useParams();

  if (!thumbId) {
    return "잘못된 주소입니다.";
  } else {
    return <Maker />;
  }
}

const skeleton_loader = keyframes`
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
`;

const animation = (props) => {
  return css`
    ${skeleton_loader} 2s infinite;
  `;
};

const skeleton = css`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background-color: #fdc000;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0),
      rgba(243, 133, 24, 0.7),
      rgba(255, 255, 255, 0)
    );
    transform: translateX(-100%);
  }
`;

const Box = styled.div`
  width: 300px;
  height: 200px;

  ${(props) => (props.$isLoading ? skeleton : "")}
  ${(props) =>
    props.$isLoading
      ? css`
          &::after {
            animation: ${animation};
          }
        `
      : ""}
`;

export default Thumbnail;
