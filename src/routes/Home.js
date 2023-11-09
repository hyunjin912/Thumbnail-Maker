import { useSelector } from "react-redux";
import styled from "styled-components";
import Headline from "../component/Headline";
import SearchContainer from "../component/SearchContainer";
import ColumnContainer from "../component/ColumnContainer";

function Home() {
  console.log("Home");
  const { page, data } = useSelector((state) => state.image);

  return (
    <Container>
      <Headline />
      <SearchContainer />
      {data.length > 0 ? <ColumnContainer /> : null}
    </Container>
  );
}

const Container = styled.div`
  width: 1120px;
  margin: 0 auto;
`;

export default Home;
