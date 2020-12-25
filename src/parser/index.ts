import { Token } from "../lexer";
import { Operator } from "../operators";

export interface Root {
  type: "ROOT";
  child?: NonRoot;
}

export interface Leaf {
  type: "LEAF";
  parent: Parent;
  value: number;
}

export interface ProtoNode {
  type: "PROTO_NODE";
  parent: Parent;
  left?: NonRoot;
}

export interface Node<T> {
  type: "NODE";
  parent: Parent;
  operator: Operator;
  left: T;
  right?: T;
}

type NonRoot = ProtoNode | Node<NonRoot> | Leaf;

type Parent = ProtoNode | Root | Node<NonRoot>;

type Cursor = Root | ProtoNode | Node<NonRoot> | Leaf;

const ROOT: Root = {
  type: "ROOT",
};

export function parser(tokens: Token[]): Root {
  const root = ROOT;

  tokens.reduce((cursor, token) => {
    switch (token.type) {
      case "OPENING_PARENTHESIS":
        return appendProtoOperation(cursor);
      case "CLOSING_PARENTHESIS":
        return ((cursor as unknown) as NonRoot).parent;
      case "OPERATOR":
        if (isHighPriorityOperator(token.operator)) {
          return appendOperation(cursor, token.operator, "HIGH_PRIORITY");
        }
        return appendOperation(cursor, token.operator, "LOW_PRIORITY");
      case "NUMBER":
        return appendLeaf(cursor, token.value);
    }
  }, ROOT);

  return root;
}

function appendProtoOperation(cursor: Cursor): Cursor {
  const protoNode = makeProtoNode(cursor as Node<NonRoot>);
  setParentsChild(cursor as Node<NonRoot>, protoNode);
  return protoNode;
}

type Priority = "HIGH_PRIORITY" | "LOW_PRIORITY";

function appendOperation(cursor: Cursor, operator: Operator, priority: Priority): Cursor {
  if (cursor.type !== "ROOT" && cursor.parent.type === "PROTO_NODE") {
    promoteToNode(cursor.parent, operator);
    return cursor.parent;
  }
  if (priority === "LOW_PRIORITY") {
    cursor = (cursor as NonRoot).parent;
  }
  if (cursor.type === "ROOT") {
    cursor = cursor.child;
  }
  const parent = (cursor as NonRoot).parent;
  const node = makeNode(parent, operator, cursor as NonRoot);
  setParentsChild(parent, node);
  return node;
}

function appendLeaf(cursor: Cursor, value: number): Cursor {
  const leaf = makeLeaf(cursor as Parent, value);
  setParentsChild(cursor as Parent, leaf);
  return leaf;
}

function setParentsChild(parent: Parent, node: NonRoot): void {
  if (parent.type === "ROOT") {
    parent.child = node;
  } else if (!parent.left) {
    parent.left = node;
  } else {
    (parent as Node<NonRoot>).right = node;
  }
}

function makeLeaf(parent: Parent, value: number): Leaf {
  return {
    type: "LEAF",
    parent,
    value,
  };
}

function makeProtoNode(parent: Parent): ProtoNode {
  return {
    type: "PROTO_NODE",
    parent,
  };
}

function makeNode(parent: Parent, operator: Operator, left: NonRoot): Node<NonRoot> {
  return {
    type: "NODE",
    parent,
    operator,
    left,
  };
}

function promoteToNode(protoNode: ProtoNode, operator: Operator): void {
  const node = (protoNode as unknown) as Node<NonRoot>;
  node.type = "NODE";
  node.operator = operator;
}

function isHighPriorityOperator(o: Operator): boolean {
  return o === "*" || o === "/";
}
