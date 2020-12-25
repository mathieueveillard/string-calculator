import { createMachine, interpret } from "xstate";
import { Operator } from "../operators";

const SEPARATOR = " ";

const OPENING_PARENTHESIS = "(";

const CLOSING_PARENTHESIS = ")";

interface NumberToken {
  type: "NUMBER";
  value: number;
}

interface OperatorToken {
  type: "OPERATOR";
  operator: Operator;
}

interface OpeningParenthesisToken {
  type: "OPENING_PARENTHESIS";
}

interface ClosingParenthesisToken {
  type: "CLOSING_PARENTHESIS";
}

export type Token = NumberToken | OperatorToken | OpeningParenthesisToken | ClosingParenthesisToken;

export function lexer(chars: string): Token[] {
  let tokens: Token[] = [];

  function appendToken(token: Token): void {
    tokens = [...tokens, token];
  }

  const machine = createMachine({
    id: "lexer",
    context: {
      token: "",
    },
    initial: "empty",
    states: {
      empty: {
        on: {
          NUMBER: "number",
          MINUS_OPERATOR: "minusOperator",
          OPENING_PARENTHESIS: "openingParenthesis",
        },
      },
      number: {
        on: {
          NUMBER: "number",
          MINUS_OPERATOR: "operator",
          OPERATOR: "operator",
          CLOSING_PARENTHESIS: "closingParenthesis",
          STOP: "stop",
        },
        entry: (context, event) => {
          const n: string = context.token + event.char;
          context.token = n;
        },
        exit: (context, event) => {
          if (event.type !== "NUMBER") {
            appendToken({ type: "NUMBER", value: parseInt(context.token) });
            context.token = "";
          }
        },
      },
      operator: {
        on: {
          NUMBER: "number",
          MINUS_OPERATOR: "minusOperator",
          OPENING_PARENTHESIS: "openingParenthesis",
        },
        entry: (_, event) => {
          appendToken({ type: "OPERATOR", operator: event.char });
        },
      },
      minusOperator: {
        on: {
          NUMBER: "number",
        },
        entry: (context) => {
          context.token = "-";
        },
      },
      openingParenthesis: {
        on: {
          NUMBER: "number",
          MINUS_OPERATOR: "minusOperator",
          OPENING_PARENTHESIS: "openingParenthesis",
        },
        entry: () => {
          appendToken({ type: "OPENING_PARENTHESIS" });
        },
      },
      closingParenthesis: {
        on: {
          OPERATOR: "operator",
          CLOSING_PARENTHESIS: "closingParenthesis",
          STOP: "stop",
        },
        entry: () => {
          appendToken({ type: "CLOSING_PARENTHESIS" });
        },
      },
      stop: {},
    },
  });

  const service = interpret(machine).start();

  const STOP = "STOP";

  [...chars.split(""), STOP].forEach((char) => {
    if (char === STOP) {
      service.send("STOP");
      service.stop();
      return;
    }
    if (char === SEPARATOR) {
      return;
    }
    if (isMinusOperator(char)) {
      service.send("MINUS_OPERATOR", { char });
      return;
    }
    if (isOperator(char)) {
      service.send("OPERATOR", { char });
      return;
    }
    if (char === OPENING_PARENTHESIS) {
      service.send("OPENING_PARENTHESIS");
      return;
    }
    if (char === CLOSING_PARENTHESIS) {
      service.send("CLOSING_PARENTHESIS");
      return;
    }
    service.send("NUMBER", { char });
    return;
  });

  return tokens;
}

function isMinusOperator(o: string): boolean {
  return o === "-";
}

function isOperator(o: string): o is Operator {
  return o === "+" || o === "-" || o === "*" || o === "/";
}
