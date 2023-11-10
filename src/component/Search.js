import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getImages } from "../api";
import styled from "styled-components";

function Serach({ onSubmit, dispatch }) {
  console.log("Serach");
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get("search");

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onFocus = useCallback((e) => {
    if (e.target.value.legnth > 0) {
      setInput(e.target.value.trim());
    }
  }, []);

  useEffect(() => {
    if (query === null) {
      console.log("이게 동작하나11111");
      setInput("");
      dispatch({ type: "RESET_IMAGES" });
    } else {
      console.log("이게 동작하나222222");

      const reloadData = async () => {
        try {
          const result = await getImages(query);
          dispatch({
            type: "ADD_IMAGES",
            search: query,
            images: result.results,
          });
        } catch (e) {
          window.alert("예기치 못한 에러가 발생하여 메인 화면으로 이동됩니다.");
          navigate("/");
        }
      };

      setInput(query);
      reloadData();
    }
  }, [query]);

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
`;

export default Serach;
