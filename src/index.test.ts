import test from "ava";

import { transform } from "./index";

test("can transform dynamic import code", (t) => {
  const src = `
  import { useState, useEffect }, React from 'react'

  export function AsyncLogin() {
    const [Login, setLogin] = useState()
    const Login = useEffect(() => {
      import('./login').then(({ LoginComponent }) => {
        setLogin(() => LoginComponent)
      })
    }, [])

    if (!Login) {
      return <Loading />
    }
    return <Login />
  }
  `;
  const out = `
  import { useState, useEffect }, React from 'react'
  import * as __SOME_UNIQUE_NAME__ from './login'

  export function AsyncLogin() {
    const [Login, setLogin] = useState()
    const Login = useEffect(() => {
      Promise.resolve(__SOME_UNIQUE_NAME__).then(({ LoginComponent }) => {
        setLogin(() => LoginComponent)
      })
    }, [])

    if (!Login) {
      return <Loading />
    }
    return <Login />
  }
  `;

  t.is(transform(src), out);
});
