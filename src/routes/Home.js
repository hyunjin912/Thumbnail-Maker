import { useSelector } from "react-redux";
import styled from "styled-components";
import Headline from "../component/Headline";
import SearchContainer from "../component/SearchContainer";
import ColumnContainer from "../component/ColumnContainer";

function Home() {
  const image = useSelector((state) => state.image);

  return (
    <Container>
      <Headline />
      <SearchContainer />
      {image.length > 0 ? <ColumnContainer /> : null}
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
    padding: 0 20px;
  }
`;

export default Home;
