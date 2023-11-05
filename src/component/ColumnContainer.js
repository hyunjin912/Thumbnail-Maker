import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";
// import getImages from "../api";

export default function ColumnContainer() {
  console.log("Col Container Comp");
  const { image, column } = useSelector((state) => ({
    image: state.image,
    column: state.column,
  }));

  // const dispatch = useDispatch();

  return <Column image={image} column={column} />;
}
