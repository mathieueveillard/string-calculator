import { EvaluableTree, evaluateAST } from "./eval";
import { lexer } from "./lexer";
import { parser } from "./parser";

export function evaluate(instructions: string): number {
  const tokens = lexer(instructions);
  const ast = parser(tokens);
  return evaluateAST(ast.child as EvaluableTree);
}
