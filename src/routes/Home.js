import styled from "styled-components";
import Headline from "../component/Headline";
import SearchContainer from "../component/SearchContainer";
import ColumnContainer from "../component/ColumnContainer";
import { useState } from "react";

function Home() {
  console.log("Home");
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Headline />
      <SearchContainer loading={loading} setLoading={setLoading} />
      <ColumnContainer loading={loading} setLoading={setLoading} />
    </Container>
  );
}

const Container = styled.div`
  width: 1120px;
  margin: 0 auto;
`;

export default Home;
