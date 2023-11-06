import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <>
      <h2>잘못된 주소 입니다.</h2>
      <button onClick={onClick}>메인으로 돌아가기</button>
    </>
  );
}

export default NotFound;
