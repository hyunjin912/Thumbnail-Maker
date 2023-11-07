import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";
import { getImages } from "../api";

export default function ColumnContainer() {
  const { page, search, data } = useSelector((state) => state.image);
  const column = useSelector((state) => state.column);
  const dispatch = useDispatch();

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
      throttle(1000, async () => {
        if (
          window.scrollY >=
          (document.body.scrollHeight - viewportHeight) * 0.9
        ) {
          console.log("지금!! - ");
          const result = await getImages(search, page + 1);

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
  }, [page]);

  return <Column data={data} column={column} />;
}
