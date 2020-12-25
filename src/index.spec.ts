import { evaluate } from ".";

it("1", function () {
  expect(evaluate("1")).toEqual(1);
});

it("1 + 1", function () {
  expect(evaluate("1 + 1")).toEqual(2);
});

it("1 * 2 + 10", function () {
  expect(evaluate("1 * 2 + 10")).toEqual(12);
});

it("1 + 2 * 10", function () {
  expect(evaluate("1 + 2 * 10")).toEqual(21);
});

it("2 * (1 + 3)", function () {
  expect(evaluate("2 * (1 + 3)")).toEqual(8);
});

it("2 * (1 + 3) + 1", function () {
  expect(evaluate("2 * (1 + 3) + 1")).toEqual(9);
});

it("(1 + 3) * 2 (control)", function () {
  expect(evaluate("(1 + 3)") * 2).toEqual(8);
});

it("2 * ((1 + 1) * 3 + 1) (control)", function () {
  expect(evaluate("2 * ((1 + 1) * 3 + 1)")).toEqual(14);
});

/*
 * To go further, one should handle the following cases:
 * - Minus operator before parenthesis: -(10+3)
 * - Parenthesis containing a single number: 3 + (1)
 */
