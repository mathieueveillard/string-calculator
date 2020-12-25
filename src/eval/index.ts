import { Node, Leaf } from "../parser";
import { Operator, PLUS, MINUS, TIMES, DIVIDED_BY } from "../operators";

export type EvaluableTree = Node<EvaluableTree> | Leaf;

export function evaluateAST(tree: EvaluableTree): number {
  if (tree.type === "LEAF") {
    return tree.value;
  }
  return evaluateArithmeticalOperation(tree.operator, evaluateAST(tree.left), evaluateAST(tree.right));
}

function evaluateArithmeticalOperation(operator: Operator, a: number, b: number): number {
  switch (operator) {
    case PLUS:
      return a + b;
    case MINUS:
      return a - b;
    case TIMES:
      return a * b;
    case DIVIDED_BY:
      return a / b;
  }
}
