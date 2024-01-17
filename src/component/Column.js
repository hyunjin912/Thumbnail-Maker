import { useState, useCallback, useEffect, useRef } from "react";
import Maker from "./Maker";
import styled, { css } from "styled-components";

function ColumnItem({ img }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(false);
  const columnItemWrapElem = useRef();
  const dummyHeightElem = useRef();
  const {
    urls: { regular },
    alt_description,
    id,
    width,
    height,
  } = img;

  const onClick = useCallback(() => {
    if (!image) return;
    setOpen(true);
  }, [image]);

  useEffect(() => {
    const regularWidth = 1080;
    let regularHeight = (height * regularWidth) / width;
    regularHeight = Number(regularHeight.toFixed(2));
    const renderWidth = columnItemWrapElem.current.clientWidth;
    const renderHeight = (regularHeight * renderWidth) / regularWidth;
    const paddingTop = (renderHeight / renderWidth) * 100;

    dummyHeightElem.current.style.paddingTop = `${paddingTop}%`;

    const imgElem = new Image();
    imgElem.src = regular;
    imgElem.setAttribute("alt", alt_description);
    imgElem.onload = () => {
      columnItemWrapElem.current.insertAdjacentElement("beforeend", imgElem);
      setImage(true);
    };
  }, [img]);

  return (
    <>
      <ColumnItemWrap
        ref={columnItemWrapElem}
        data-id={id}
        onClick={onClick}
        $image={image}
        className={image ? "" : "skeleton"}
      >
        <span ref={dummyHeightElem}></span>
      </ColumnItemWrap>
      {open && <Maker id={id} setOpen={setOpen} />}
    </>
  );
}

function ColumnList({ className, imgs }) {
  return (
    <ColumnListWrap className={className}>
      {imgs.map((img, idx) => (
        <ColumnItem key={idx} img={img} />
      ))}
    </ColumnListWrap>
  );
}

function Column({ data, column }) {
  const columns = [];
  for (let i = 1; i <= column; i++) {
    columns.push({
      id: i,
      name: `column-${i}`,
      imgs: [],
    });
  }
  for (let i = 0; i < data.length; i++) {
    const idx = i % column;
    columns[idx].imgs.push(data[i]);
  }

  return (
    <Wrap>
      {columns.map((col) => (
        <ColumnList key={col.id} className={col.name} imgs={col.imgs} />
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-bottom: 20px;

  img {
    max-width: 100%;
    display: block;
  }
`;

const ColumnListWrap = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColumnItemWrap = styled.div`
  position: relative;
  cursor: pointer;

  & span {
    background: #fdc000;
    display: block;
  }

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${(props) =>
    props.$image
      ? css`
          &:hover::after {
            content: "";
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
          }
        `
      : css``}
`;

export default Column;
