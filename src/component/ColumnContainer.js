import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";
import Spinner from "./Spinner";
import { getImages } from "../api";

export default function ColumnContainer() {
  console.log("ColumnContainer");
  const { page, search, data } = useSelector((state) => state.image);
  const column = useSelector((state) => state.column);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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

    window.addEventListener(
      "scroll",
      throttle(500, async () => {
        if (
          Math.ceil(window.scrollY) >=
          Math.floor(document.body.scrollHeight - viewportHeight)
        ) {
          if (loading) return;
          console.log("지금!! - ");
          setLoading(true);
          const result = await getImages(search, page + 1);
          setLoading(false);
          dispatch({
            type: "UPDATE_IMAGES",
            images: result.results,
            page: page + 1,
          });
        }
      }),
    );

    return () => {
      console.log("언 마운트");

      window.removeEventListener("scroll", onScroll);
    };
  }, [page, loading]);

  return (
    <>
      <Column data={data} column={column} />
      {loading ? <Spinner /> : null}
    </>
  );
}
