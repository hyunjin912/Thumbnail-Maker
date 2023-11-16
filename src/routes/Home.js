import styled from "styled-components";
import Headline from "../component/Headline";
import SearchContainer from "../component/SearchContainer";
import ColumnContainer from "../component/ColumnContainer";
import { useState } from "react";

function Home() {
  const [loading, setLoading] = useState({
    is: false,
    evt: "",
  });
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <Container>
      <Headline />
      <SearchContainer 
        loading={loading} 
        setLoading={setLoading} 
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
      />
      <ColumnContainer 
        loading={loading} 
        setLoading={setLoading}
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
      />
    </Container>
  );
}

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export default Home;
