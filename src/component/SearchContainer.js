import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { getImages } from "../api";

export default function SearchContainer() {
  const image = useSelector((state) => state.image);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const [inputEl] = e.target.children;
      const search = inputEl.value.trim();
      inputEl.blur();

      const result = await getImages(search);

      dispatch({
        type: "ADD_IMAGES",
        images: result.results,
      });

      navigate(`/?search=${search}`);
    },
    [dispatch],
  );

  return <Search onSubmit={onSubmit} image={image} dispatch={dispatch} />;
}
