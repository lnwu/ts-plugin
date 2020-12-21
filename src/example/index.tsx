import React from "react";
import ReactDom from "react-dom";
import { AsyncLogin } from "./AsyncLogin";

export const transform = () => {
  return <AsyncLogin />;
};

ReactDom.render(
  <AsyncLogin />,
  document.getElementById("root") as HTMLDivElement
);
