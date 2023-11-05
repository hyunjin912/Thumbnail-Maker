import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Search from "./Search";
import getImages from "../api";

export default function SearchContainer() {
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const [inputEl] = e.target.children;
      const result = await getImages(inputEl.value);

      dispatch({
        type: "ADD_IMAGES",
        images: result.results,
      });
    },
    [dispatch],
  );

  return <Search onSubmit={onSubmit} />;
}
