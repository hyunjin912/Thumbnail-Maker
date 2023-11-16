import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { getImages } from "../api";

export default function SearchContainer({ loading, setLoading, setIsEmpty }) {
  const { page, search, data } = useSelector((state) => state.image);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const [inputEl] = e.target.children;
      const inputValue = inputEl.value.trim();
      inputEl.blur();

      if (search === inputValue) return;

      if (inputValue.length > 0) {
        setIsEmpty(false);
        setLoading({
          is: true,
          evt: "submit",
        });
        dispatch({ type: "RESET_IMAGES" });

        try {
          const result = await getImages(inputValue);
          const historyState = {
            page: 1,
            images: [...result.results],
            total_pages: result.total_pages,
            search: inputValue,
          };
          navigate(`/?search=${inputValue}`, { state: historyState });

          dispatch({
            type: "ADD_IMAGES",
            search: inputValue,
            page: 1,
            images: result.results,
            total_pages: result.total_pages,
          });

          setLoading({
            is: false,
            evt: "",
          });

          if (result.total <= 0) {
            setIsEmpty(true);
          }
        } catch (e) {
          window.alert("예기치 못한 에러가 발생하여 메인 화면으로 이동됩니다.");
          navigate("/");
        }
      } else {
        navigate("/");
      }
    },
    [search, data],
  );

  return <Search onSubmit={onSubmit} setIsEmpty={setIsEmpty} />;
}
