import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";
import Spinner from "./Spinner";
import { getImages } from "../api";
import { useNavigate } from "react-router-dom";

const msg = {
  empty: "검색된 결과가 없습니다.",
};

export default function ColumnContainer({ loading, setLoading, isEmpty }) {
  const navigate = useNavigate();
  const { page, search, data, total_pages } = useSelector(
    (state) => state.image
  );
  const column = useSelector((state) => state.column);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(loading);
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

    window.addEventListener(
      "scroll",
      throttle(500, async () => {
        if (
          Math.ceil(window.scrollY) >=
          Math.floor(
            (document.body.scrollHeight - document.body.offsetHeight) * 0.99
          )
        ) {
          if (loading.is || data.length === 0 || total_pages <= page) {
            return;
          }
          setLoading({
            is: true,
            evt: "scroll",
          });

          try {
            const result = await getImages(search, page + 1);
            const historyState = {
              page: page + 1,
              images: [...data, ...result.results],
              total_pages: result.total_pages,
              search,
            };
            navigate(`/?search=${search}`, {
              state: historyState,
              replace: true,
            });
            setLoading({
              is: false,
              evt: "",
            });
            dispatch({
              type: "UPDATE_IMAGES",
              images: result.results,
              page: page + 1,
              total_pages: result.total_pages,
            });
          } catch (e) {
            window.alert(
              "예기치 못한 에러가 발생하여 메인 화면으로 이동됩니다."
            );
            navigate("/");
          }
        }
      })
    );

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [page, loading, data]);

  return (
    <>
      <Column data={data} column={column} />
      {loading.is ? <Spinner /> : null}
      {isEmpty && msg.empty}
    </>
  );
}
