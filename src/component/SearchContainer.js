import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { getImages } from "../api";

export default function SearchContainer() {
  console.log("SearchContainer");
  const { page, search, data } = useSelector((state) => state.image);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    const [inputEl] = e.target.children;
    const search = inputEl.value.trim();
    inputEl.blur();

    try {
      const result = await getImages(search);
      console.log("SC result - ", result);

      dispatch({
        type: "ADD_IMAGES",
        search: search,
        images: result.results,
      });
    } catch (e) {
      console.log("오마이갓 - ", e);
    }

    navigate(`/?search=${search}`);
  }, []);

  return <Search onSubmit={onSubmit} data={data} dispatch={dispatch} />;
}
