import ts, { factory, isSourceFile } from "typescript";

const createTransformer = () => {
  const imports = new Set<string>();

  return (ctx: ts.TransformationContext) => {
    const visitor: ts.Visitor = (node) => {
      if (ts.isSourceFile(node)) {
        return ts.visitEachChild(node, visitor, ctx);
      }

      if (ts.isPropertyAccessExpression(node)) {
        return updateDynamicImportNode(node, ctx, imports);
      }

      if (isSourceFile(node.parent)) {
        const nodes: ts.Node[] = [];
        nodes.push(ts.visitEachChild(node, visitor, ctx));

        if (imports.size > 0) {
          for (const importPath of imports) {
            nodes.push(
              factory.createImportDeclaration(
                undefined,
                undefined,
                factory.createImportClause(
                  false,
                  undefined,
                  factory.createNamespaceImport(
                    factory.createIdentifier(pathToUniqueName(importPath))
                  )
                ),
                factory.createStringLiteral(importPath)
              )
            );
            imports.delete(importPath);
          }
        }

        return nodes;
      }

      return ts.visitEachChild(node, visitor, ctx);
    };

    return (node: ts.Node) => ts.visitNode(node, visitor);
  };
};

const updateDynamicImportNode = (
  node: ts.Node,
  ctx: ts.TransformationContext,
  imports: Set<string>
): ts.Node => {
  const visitor: ts.Visitor = (node) => {
    if (ts.isCallExpression(node)) {
      const arg = node.arguments[0];
      if (
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        ts.isStringLiteral(arg)
      ) {
        imports.add(arg.text);

        return factory.createCallExpression(
          factory.createPropertyAccessExpression(
            factory.createIdentifier("Promise"),
            factory.createIdentifier("resolve")
          ),
          undefined,
          [factory.createIdentifier(pathToUniqueName(arg.text))]
        );
      }

      return node;
    }

    return node;
  };

  return ts.visitEachChild(node, visitor, ctx);
};

const nodeNew = () =>
  factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamespaceImport(
        factory.createIdentifier("__SOME_UNIQUE_NAME__")
      )
    ),
    factory.createStringLiteral("./Login")
  );

const pathToUniqueName = (path: string): string => {
  return `__${path.toUpperCase().replace("./", "")}__`;
};

export default createTransformer;
