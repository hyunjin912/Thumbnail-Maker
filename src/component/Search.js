import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

function Serach({ onSubmit }) {
  console.log("Search Comp");
  const [input, setInput] = useState("");
  const query = new URLSearchParams(useLocation().search).get("search");
  const inputRef = useRef(null);
  console.log("input - ", input);

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onFocus = useCallback((e) => {
    setInput(e.target.value.trim());
  }, []);

  useEffect(() => {
    if (!input && query) {
      console.log("query - ", query);
      inputRef.current.value = query;
    }
  }, [query]);

  return (
    <Wrap>
      <Form onSubmit={onSubmit}>
        <Input
          ref={inputRef}
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

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export default Serach;
