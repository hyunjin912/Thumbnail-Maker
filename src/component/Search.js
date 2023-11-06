import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getImages } from "../api";
import styled from "styled-components";

function Serach({ onSubmit, image, dispatch }) {
  const [input, setInput] = useState("");
  const query = new URLSearchParams(useLocation().search).get("search");

  console.log(image, dispatch, query);

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onFocus = useCallback((e) => {
    setInput(e.target.value.trim());
  }, []);

  useEffect(() => {
    console.log("effffffff");
    if (!input && query) {
      console.log(111);
      setInput(query);

      if (image.length === 0) {
        console.log("설마?");
        const reloadData = async () => {
          const result = await getImages(query);
          dispatch({
            type: "ADD_IMAGES",
            images: result.results,
          });
        };

        reloadData();
      }
    } else if (image.length === 0) {
      console.log(222);
    }

    //  else if (image && query) {
    //   console.log("설마?");
    // const reloadData = async () => {
    //   const result = await getImages(query);
    //   dispatch({
    //     type: "ADD_IMAGES",
    //     images: result.results,
    //   });
    // };

    // reloadData();
    // }
  }, []);

  return (
    <Wrap>
      <Form onSubmit={onSubmit}>
        <Input
          value={input}
          onChange={onChange}
          onFocus={onFocus}
          type="text"
          placeholder="Search & Enter"
        />
        <Button type="submit">Search</Button>
      </Form>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: sticky;
  top: 0;
  height: 40px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 20px;
  margin-bottom: 20px;
  z-index: 1;

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  height: 100%;
`;

const Input = styled.input`
  flex: 1 1 auto;
  background: #fff;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Button = styled.button`
  flex: 0 1 150px;
  background: #fdc000;
  color: #000;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 0 20px;
  cursor: pointer;
  font-weight: bold;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: #f86a05;
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export default Serach;
