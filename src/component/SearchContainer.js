import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { getImages } from "../api";

export default function SearchContainer({ loading, setLoading }) {
  console.log("SearchContainer");
  const { page, search, data } = useSelector((state) => state.image);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const [inputEl] = e.target.children;
      const search = inputEl.value.trim();
      inputEl.blur();
      console.log("submit - ", search, search.length);
      if (search.length > 0) {
        setLoading(true);
        navigate(`/?search=${search}`);
      } else {
        navigate("/");
      }

      try {
        const result = await getImages(search);
        console.log("SC result - ", result);

        dispatch({
          type: "ADD_IMAGES",
          search: search,
          images: result.results,
          total_pages: result.total_pages,
        });

        setLoading(false);
      } catch (e) {
        window.alert("예기치 못한 에러가 발생하여 메인 화면으로 이동됩니다.");
        navigate("/");
      }
    },
    [search, data],
  );

  return (
    <Search
      onSubmit={onSubmit}
      dispatch={dispatch}
      data={data}
      loading={loading}
      setLoading={setLoading}
    />
  );
}
