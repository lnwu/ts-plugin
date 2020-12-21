import { create } from "ts-node";
import ts, { factory } from "typescript";

const transformer = (
  ctx: ts.TransformationContext
): ts.Transformer<ts.SourceFile> => {
  const visitor: ts.Visitor = (node: ts.Node): ts.Node => {
    if (ts.isSourceFile(node)) {
      return ts.visitEachChild(node, visitor, ctx);
    }

    if (ts.isImportDeclaration(node)) {
      return updateImportNode(node, ctx);
    }

    return node;
  };

  return (sf: ts.SourceFile) => {
    return ts.visitNode(sf, visitor);
  };
};

const updateImportNode = (
  node: ts.Node,
  ctx: ts.TransformationContext
): ts.Node => {
  let identifierName: string;

  const visitor: ts.Visitor = (node) => {
    if (ts.isNamedImports(node)) {
      identifierName = node.getChildAt(1).getText();
      return ts.factory.createIdentifier(identifierName);
    }

    if (ts.isStringLiteral(node)) {
      const libName = node.text;
      if (identifierName) {
        const fileName = identifierName.toLocaleLowerCase();
        return ts.factory.createStringLiteral(`${libName}/lib/${fileName}`);
      }
    }

    if (node.getChildCount()) {
      return ts.visitEachChild(node, visitor, ctx);
    }
    return node;
  };

  return ts.visitEachChild(node, visitor, ctx);
};

const compile = (sourceCode: string): string => {
  const source = ts.createSourceFile(
    "",
    sourceCode,
    ts.ScriptTarget.Latest,
    true
  );

  const result = ts.transform(source, [transformer]);

  const transformedSourceFile = result.transformed[0];
  const printer = ts.createPrinter();
  const resultCode = printer.printFile(transformedSourceFile);

  return resultCode;
};

export default compile;
