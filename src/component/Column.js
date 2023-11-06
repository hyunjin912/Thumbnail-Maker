import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ColumnItem({ img }) {
  const navigate = useNavigate();
  const {
    urls: { regular },
    alt_description,
    id,
  } = img;

  const onClick = () => {
    navigate(`thumb/${id}`);
  };

  return (
    <ColumnItemWrap onClick={onClick}>
      <img src={regular} alt={alt_description} />
    </ColumnItemWrap>
  );
}

function ColumnList({ className, imgs }) {
  return (
    <ColumnListWrap className={className}>
      {imgs.map((img) => (
        <ColumnItem key={img.id} img={img} />
      ))}
    </ColumnListWrap>
  );
}

function Column({ image, column }) {
  const columns = [];
  for (let i = 1; i <= column; i++) {
    columns.push({
      id: i,
      name: `column-${i}`,
      imgs: [],
    });
  }
  for (let i = 0; i < image.length; i++) {
    const idx = i % column;
    columns[idx].imgs.push(image[i]);
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

  img {
    max-width: 100%;
    display: block;
  }

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
  }
`;

const ColumnListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColumnItemWrap = styled.div`
  cursor: pointer;
`;

export default Column;
