import { useState, useCallback, useEffect } from "react";
import Maker from "./Maker";
import styled, { css } from "styled-components";

function ColumnItem({ img }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(false);
  const {
    urls: { regular },
    alt_description,
    id,
  } = img;

  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    const imgElem = new Image();

    imgElem.src = regular;
    imgElem.onload = () => {
      setImage(true);
    };
  }, []);

  return (
    <>
      <ColumnItemWrap
        data-id={id}
        onClick={onClick}
        $image={image}
        className={image ? "123" : "skeleton"}
      >
        {image && <img src={regular} alt={alt_description} />}
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
      : css`
          &::before {
            content: "";
            background: #fdc000;
            display: block;
            padding-top: 70%;
          }
        `}
`;

export default Column;
