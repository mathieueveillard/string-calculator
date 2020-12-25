import { lexer } from ".";

it("1", function () {
  expect(lexer("1")).toEqual([{ type: "NUMBER", value: 1 }]);
});

it("1 + 1", function () {
  expect(lexer("1 + 1")).toEqual([
    { type: "NUMBER", value: 1 },
    { type: "OPERATOR", operator: "+" },
    { type: "NUMBER", value: 1 },
  ]);
});

it("1+1", function () {
  expect(lexer("1+1")).toEqual([
    { type: "NUMBER", value: 1 },
    { type: "OPERATOR", operator: "+" },
    { type: "NUMBER", value: 1 },
  ]);
});

it("10+1", function () {
  expect(lexer("10+1")).toEqual([
    { type: "NUMBER", value: 10 },
    { type: "OPERATOR", operator: "+" },
    { type: "NUMBER", value: 1 },
  ]);
});

it("1+-1", function () {
  expect(lexer("1+-1")).toEqual([
    { type: "NUMBER", value: 1 },
    { type: "OPERATOR", operator: "+" },
    { type: "NUMBER", value: -1 },
  ]);
});

it("-1+1", function () {
  expect(lexer("-1+1")).toEqual([
    { type: "NUMBER", value: -1 },
    { type: "OPERATOR", operator: "+" },
    { type: "NUMBER", value: 1 },
  ]);
});

it("1-1", function () {
  expect(lexer("1-1")).toEqual([
    { type: "NUMBER", value: 1 },
    { type: "OPERATOR", operator: "-" },
    { type: "NUMBER", value: 1 },
  ]);
});

it("(1+2)*3", function () {
  expect(lexer("(1+2)*3")).toEqual([
    { type: "OPENING_PARENTHESIS" },
    { type: "NUMBER", value: 1 },
    { type: "OPERATOR", operator: "+" },
    { type: "NUMBER", value: 2 },
    { type: "CLOSING_PARENTHESIS" },
    { type: "OPERATOR", operator: "*" },
    { type: "NUMBER", value: 3 },
  ]);
});

it("1*(2+3)", function () {
  expect(lexer("1*(2+3)")).toEqual([
    { type: "NUMBER", value: 1 },
    { type: "OPERATOR", operator: "*" },
    { type: "OPENING_PARENTHESIS" },
    { type: "NUMBER", value: 2 },
    { type: "OPERATOR", operator: "+" },
    { type: "NUMBER", value: 3 },
    { type: "CLOSING_PARENTHESIS" },
  ]);
});

it("1*(-2+3)", function () {
  expect(lexer("1*(-2+3)")).toEqual([
    { type: "NUMBER", value: 1 },
    { type: "OPERATOR", operator: "*" },
    { type: "OPENING_PARENTHESIS" },
    { type: "NUMBER", value: -2 },
    { type: "OPERATOR", operator: "+" },
    { type: "NUMBER", value: 3 },
    { type: "CLOSING_PARENTHESIS" },
  ]);
});

it("((1 + 2) * 3)", function () {
  expect(lexer("((1 + 2) * 3)")).toEqual([
    { type: "OPENING_PARENTHESIS" },
    { type: "OPENING_PARENTHESIS" },
    { type: "NUMBER", value: 1 },
    { type: "OPERATOR", operator: "+" },
    { type: "NUMBER", value: 2 },
    { type: "CLOSING_PARENTHESIS" },
    { type: "OPERATOR", operator: "*" },
    { type: "NUMBER", value: 3 },
    { type: "CLOSING_PARENTHESIS" },
  ]);
});
