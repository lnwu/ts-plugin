import React, { useState, useEffect } from "react";
import Loading from "./Loading";

export function AsyncLogin() {
  const [Login, setLogin] = useState<() => JSX.Element>();
  const [Login2, setLogin2] = useState<() => JSX.Element>();

  useEffect(() => {
    import("./Login").then(({ LoginComponent }) => {
      setLogin(() => LoginComponent);
    });
    import("./Login").then(({ LoginComponent }) => {
      setLogin2(() => LoginComponent);
    });
  }, []);

  if (!Login || !Login2) {
    return <Loading />;
  }
  return (
    <>
      <Login />
      <Login2 />
    </>
  );
}
