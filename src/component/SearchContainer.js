import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { getImages } from "../api";

export default function SearchContainer() {
  const { page, search, data } = useSelector((state) => state.image);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    const [inputEl] = e.target.children;
    const search = inputEl.value.trim();
    inputEl.blur();

    const result = await getImages(search);

    dispatch({
      type: "ADD_IMAGES",
      search: search,
      images: result.results,
    });

    navigate(`/?search=${search}`);
  }, []);

  return <Search onSubmit={onSubmit} data={data} dispatch={dispatch} />;
}
