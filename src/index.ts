import ts from "typescript";

export function createTransformer() {
  return (ctx: ts.TransformationContext) => {
    const visitor: ts.Visitor = (node) => {
      return node;
    };

    return (node: ts.Node) => ts.visitNode(node, visitor);
  };
}

export default createTransformer;
