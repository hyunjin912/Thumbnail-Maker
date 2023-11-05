import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import getImages from "../api";

export default function SearchContainer() {
  console.log("Search Container Comp");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const [inputEl] = e.target.children;
      console.log(123, inputEl.value);
      const search = inputEl.value.trim();
      inputEl.blur();

      const result = await getImages(search);

      console.log("Search Container Comp - ", result.results);

      dispatch({
        type: "ADD_IMAGES",
        images: result.results,
      });

      navigate(`/?search=${search}`);
    },
    [dispatch],
  );

  return <Search onSubmit={onSubmit} />;
}
