import test from "ava";

import compile from "./index";

test("can transform dynamic import code", (t) => {
  const src = `import { Button } from "antd";`;
  const out = `import Button from "antd/lib/button";\n`;

  t.is(compile(src), out);
});
