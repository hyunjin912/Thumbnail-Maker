import { useEffect } from "react";
import { useSelector } from "react-redux";
import Column from "./Column";

export default function ColumnContainer() {
  const image = useSelector((state) => state.image);
  const column = useSelector((state) => state.column);

  useEffect(() => {
    console.log("마운트");
    let timer = null;
    let onScroll = null;
    const throttle = (delay, func) => {
      onScroll = (e) => {
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            func(e);
          }, delay);
        }
      };

      return onScroll;
    };

    window.addEventListener(
      "scroll",
      throttle(500, () => {
        console.log("heool");
      }),
    );

    return () => {
      console.log("언 마운트");
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <Column image={image} column={column} />;
}
