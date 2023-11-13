import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";
import Spinner from "./Spinner";
import { getImages } from "../api";
import { useNavigate } from "react-router-dom";

export default function ColumnContainer({ loading, setLoading }) {
  console.log("ColumnContainer");
  const navigate = useNavigate();
  const { page, search, data, total_pages } = useSelector(
    (state) => state.image,
  );
  const column = useSelector((state) => state.column);
  const dispatch = useDispatch();

  useEffect(() => {
    const div = document.createElement("div");
    div.classList.add("hj");
    div.style.width = "400px";
    div.style.background = "red";
    div.style.color = "#fff";
    div.style.fontSize = "12vw";
    div.style.fontWeight = "bold";
    div.style.position = "fixed";
    div.style.zIndex = 99999999;
    // document.body.insertAdjacentElement("afterbegin", div);
  }, []);

  useEffect(() => {
    console.log("마운트");

    let timer = null;
    let onScroll = null;
    const throttle = (delay, func) => {
      onScroll = (e) => {
        if (!timer) {
          timer = setTimeout(() => {
            func(e);
            timer = null;
          }, delay);
        }
      };

      return onScroll;
    };

    const viewportHeight = document.body.offsetHeight;
    // const viewportHeight = window.innerHeight;

    if (loading) {
      window.scrollTo(0, document.body.scrollHeight - viewportHeight);
    }

    window.addEventListener(
      "scroll",
      throttle(500, async () => {
        // document.querySelector(".hj").innerHTML = `현재스크롤 : ${Math.ceil(
        //   window.scrollY,
        // )}<br />
        // 총스크롤 : ${Math.floor(document.body.scrollHeight - viewportHeight)}
        // `;

        if (
          Math.ceil(window.scrollY) >=
          Math.floor(document.body.scrollHeight - viewportHeight)
        ) {
          if (loading || data.length === 0 || total_pages <= page) {
            return;
          }
          console.log("지금!! - ", loading, search, data);
          setLoading(true);

          try {
            const result = await getImages(search, page + 1);
            setLoading(false);
            dispatch({
              type: "UPDATE_IMAGES",
              images: result.results,
              page: page + 1,
              total_pages: result.total_pages,
            });
          } catch (e) {
            window.alert(
              "예기치 못한 에러가 발생하여 메인 화면으로 이동됩니다.",
            );
            navigate("/");
          }
        }
      }),
    );

    return () => {
      console.log("언 마운트");

      window.removeEventListener("scroll", onScroll);
    };
  }, [page, loading, data]);

  return (
    <>
      <Column data={data} column={column} />
      {loading ? <Spinner /> : null}
    </>
  );
}
