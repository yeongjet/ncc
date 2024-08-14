export enum TokenType {
  /** Punctuators */
  PUNCT_PLUS, // +
  PUNCT_MINUS, // -
  PUNCT_STAR, // *
  PUNCT_DIVIDE, // /
  PUNCT_MOD, // %
  PUNCT_EQ, // ==
  PUNCT_NEQ, // !=
  PUNCT_LT, // <
  PUNCT_LEQ, // <=
  PUNCT_GT, // >
  PUNCT_GEQ, // >=
  PUNCT_ASSIGN, // =
  PUNCT_POINTSTO, // ->
  PUNCT_DOT, // .
  PUNCT_AND, // &
  PUNCT_LEFT_PARENTHESIS, // (
  PUNCT_RIGHT_PARENTHESIS, // )
  PUNCT_LEFT_SQUARE_BRACKET, // [
  PUNCT_RIGHT_SQUARE_BRACKET, // ]
  PUNCT_LEFT_CURLY_BRACKET, // {
  PUNCT_RIGHT_CURLY_BRACKET, // }
  PUNCT_SEMICOLON, // ;
  PUNCT_COMMA, // ,
  PUNCT_ELLIPSIS, // ...

  /* Keywords */
  KW_CHAR, // char
  KW_SHORT, // short
  KW_INT, // int
  KW_VOID, // void
  KW_STRUCT, // struct
  KW_IF, // if
  KW_ELSE, // else
  KW_FOR, // for
  KW_CONTINUE, // continue
  KW_BREAK, // break
  KW_RETURN, // return
  KW_SIZEOF, // sizeof

  /* identifier */
  IDENTIFIER,

  /* Constants */
  CONST_INT, // integer-constant
  CONST_FLOAT, // floating-constant
  CONST_ENUM, // enumeration-constant
  CONST_CHAR, // character-constant

  /* String literals */
  STR_LITERAL,

  /** Others */
  EOF // End of file
}

export const nondigit = [
  '_',
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']