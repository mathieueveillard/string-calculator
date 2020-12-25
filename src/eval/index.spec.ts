import { EvaluableTree, evaluateAST } from ".";

const FAKE_PARENT = null;

it("should evaluate a leaf", function () {
  const ast: EvaluableTree = {
    parent: FAKE_PARENT,
    type: "LEAF",
    value: 1,
  };
  expect(evaluateAST(ast)).toEqual(1);
});

it("should evaluate a node made of two leaves (+)", function () {
  const ast: EvaluableTree = {
    parent: FAKE_PARENT,
    type: "NODE",
    operator: "+",
    left: {
      parent: FAKE_PARENT,
      type: "LEAF",
      value: 1,
    },
    right: {
      parent: FAKE_PARENT,
      type: "LEAF",
      value: 1,
    },
  };
  expect(evaluateAST(ast)).toEqual(2);
});

it("should evaluate a node made of two leaves (-)", function () {
  const ast: EvaluableTree = {
    parent: FAKE_PARENT,
    type: "NODE",
    operator: "-",
    left: {
      parent: FAKE_PARENT,
      type: "LEAF",
      value: 1,
    },
    right: {
      parent: FAKE_PARENT,
      type: "LEAF",
      value: 1,
    },
  };
  expect(evaluateAST(ast)).toEqual(0);
});

it("should evaluate a node made of two leaves (*)", function () {
  const ast: EvaluableTree = {
    parent: FAKE_PARENT,
    type: "NODE",
    operator: "*",
    left: {
      parent: FAKE_PARENT,
      type: "LEAF",
      value: 1,
    },
    right: {
      parent: FAKE_PARENT,
      type: "LEAF",
      value: 1,
    },
  };
  expect(evaluateAST(ast)).toEqual(1);
});

it("should evaluate a node made of two leaves (/)", function () {
  const ast: EvaluableTree = {
    parent: FAKE_PARENT,
    type: "NODE",
    operator: "/",
    left: {
      parent: FAKE_PARENT,
      type: "LEAF",
      value: 1,
    },
    right: {
      parent: FAKE_PARENT,
      type: "LEAF",
      value: 2,
    },
  };
  expect(evaluateAST(ast)).toEqual(0.5);
});

it("should evaluate a node made of one leaf and one node", function () {
  const ast: EvaluableTree = {
    parent: FAKE_PARENT,
    type: "NODE",
    operator: "+",
    left: {
      parent: FAKE_PARENT,
      type: "LEAF",
      value: 1,
    },
    right: {
      parent: FAKE_PARENT,
      type: "NODE",
      operator: "*",
      left: {
        parent: FAKE_PARENT,
        type: "LEAF",
        value: 2,
      },
      right: {
        parent: FAKE_PARENT,
        type: "LEAF",
        value: 3,
      },
    },
  };
  expect(evaluateAST(ast)).toEqual(7);
});
