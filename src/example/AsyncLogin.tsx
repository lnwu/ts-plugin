import React, { useState, useEffect } from "react";
import Loading from "./Loading";

export function AsyncLogin() {
  const [Login, setLogin] = useState<() => JSX.Element>();
  useEffect(() => {
    import("./Login").then(({ LoginComponent }) => {
      setLogin(() => LoginComponent);
    });
  }, []);

  if (!Login) {
    return <Loading />;
  }
  return <Login />;
}
