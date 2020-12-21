import test from "ava";
import ts from "typescript";
import fs from "fs";
import { resolve } from "path";
import transformerFactory from "../index";

const transformer = transformerFactory();
const printer = ts.createPrinter();

test("can transform dynamic import to static", (t) => {
  const fileName = "AsyncLogin.tsx";
  const sourceCode = fs.readFileSync(
    resolve(__dirname, "fixtures", fileName),
    "utf-8"
  );

  const source = ts.createSourceFile(
    fileName,
    sourceCode,
    ts.ScriptTarget.ESNext,
    true
  );

  const result = ts.transform(source, [transformer]);

  const transformedSourceFile = result.transformed[0];

  const resultCode = printer.printFile(transformedSourceFile as ts.SourceFile);

  t.snapshot(resultCode);

  result.dispose();
});

test("can transform 2 dynamic import to static", (t) => {
  const fileName = "AsyncLogin2.tsx";
  const sourceCode = fs.readFileSync(
    resolve(__dirname, "fixtures", fileName),
    "utf-8"
  );

  const source = ts.createSourceFile(
    fileName,
    sourceCode,
    ts.ScriptTarget.ESNext,
    true
  );

  const result = ts.transform(source, [transformer]);

  const transformedSourceFile = result.transformed[0];

  const resultCode = printer.printFile(transformedSourceFile as ts.SourceFile);

  t.snapshot(resultCode);

  result.dispose();
});

test("can transform 2 dynamic import to 1 static", (t) => {
  const fileName = "AsyncLogin3.tsx";
  const sourceCode = fs.readFileSync(
    resolve(__dirname, "fixtures", fileName),
    "utf-8"
  );

  const source = ts.createSourceFile(
    fileName,
    sourceCode,
    ts.ScriptTarget.ESNext,
    true
  );

  const result = ts.transform(source, [transformer]);

  const transformedSourceFile = result.transformed[0];

  const resultCode = printer.printFile(transformedSourceFile as ts.SourceFile);

  t.snapshot(resultCode);

  result.dispose();
});
