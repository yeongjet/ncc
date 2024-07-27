import { IMAGE_SECTION_HEADER } from "./windows";

export type Type = {
  t: number;
  ref: Symbo | null;
};

export type Symbo = {
  v: number; // 符号的单词编码
  r: number; // 符号关联的寄存器
  c: number; // 符号关联值
  type: Type; // 符号类型
  next: Symbo | null; // 关联的其它符号，结构体定义关联成员变量符号，函数定义关联参数符号
  prev_tok: Symbo | null; // 指向前一定义的同名符号
};

export type TkWord = {
  tkcode: TkCode;
  next: TkWord | null; // 指向哈希冲突的其它单词
  spelling: string; // 单词字符串
  sym_struct: Symbo | null; // 指向单词所表示的结构定义
  sym_identifier: Symbo | null; // 指向单词所表示的标识符
};

export enum TkCode {
  TK_PLUS, // + 加号
  TK_MINUS, // - 减号
  TK_STAR, // * 星号
  TK_DIVIDE, // / 除号
  TK_MOD, // % 求余运算符
  TK_EQ, // == 等于号
  TK_NEQ, // != 不等于号
  TK_LT, // < 小于号
  TK_LEQ, // <= 小于等于号
  TK_GT, // > 大于号
  TK_GEQ, // >= 大于等于号
  TK_ASSIGN, // = 赋值运算符
  TK_POINTSTO, // -> 指向结构体成员运算符
  TK_DOT, // . 结构体成员运算符
  TK_AND, // & 地址与运算符
  TK_OPENPA, // ( 左圆括号
  TK_CLOSEPA, // ) 右圆括号
  TK_OPENBR, // [ 左中括号
  TK_CLOSEBR, // ] 右圆括号
  TK_BEGIN, // { 左大括号
  TK_END, // } 右大括号
  TK_SEMICOLON, // ; 分号
  TK_COMMA, // , 逗号
  TK_ELLIPSIS, // ... 省略号
  TK_EOF, // 文件结束符

  /* 常量 */
  TK_CINT, // 整型常量
  TK_CCHAR, // 字符常量
  TK_CSTR, // 字符串常量

  /* 关键字 */
  KW_CHAR, // char关键字
  KW_SHORT, // short关键字
  KW_INT, // int关键字
  KW_VOID, // void关键字
  KW_STRUCT, // struct关键字
  KW_IF, // if关键字
  KW_ELSE, // else关键字
  KW_FOR, // for关键字
  KW_CONTINUE, // continue关键字
  KW_BREAK, // break关键字
  KW_RETURN, // return关键字
  KW_SIZEOF, // sizeof关键字

  KW_ALIGN, // __align关键字
  KW_CDECL, // __cdecl关键字 standard c call
  KW_STDCALL, // __stdcall关键字 pascal c call

  /* 标识符 */
  TK_IDENT,
}

/* 类型编码 */
export enum TypeCode {
  /* types */
  T_INT, // 整型
  T_CHAR, // 字符型
  T_SHORT, // 短整型
  T_VOID, // 空类型
  T_PTR, // 指针
  T_FUNC, // 函数
  T_STRUCT, // 结构体

  T_BTYPE = 0x000f, // 基本类型掩码
  T_ARRAY = 0x0010, // 数组
}

export enum StorageClass {
  SC_GLOBAL = 0x00f0, // 包括：包括整型常量，字符常量、字符串常量,全局变量,函数定义
  SC_LOCAL = 0x00f1, // 栈中变量
  SC_LLOCAL = 0x00f2, // 寄存器溢出存放栈中
  SC_CMP = 0x00f3, // 使用标志寄存器
  SC_VALMASK = 0x00ff, // 存储类型掩
  SC_LVAL = 0x0100, // 左值
  SC_SYM = 0x0200, // 符号

  SC_ANOM = 0x10000000, // 匿名符号
  SC_STRUCT = 0x20000000, // 结构体符号
  SC_MEMBER = 0x40000000, // 结构成员变量
  SC_PARAMS = 0x80000000, // 函数参数
}

export type Operand = {
  type: Type; // 数据类型
  r: number; // 寄存器或存储类型
  value: number; // 常量值，适用于SC_GLOBAL
  sym: Symbo; // 符号，适用于(SC_SYM | SC_GLOBAL)
};

export type Section = {
  data_offset: number; // 当前数据偏移位置
  data: (string | CoffSym)[]; // 节数据
  index: number; // 节序号
  link: Section; // 关联的其它节
  hashtab: Record<string, number>; // 哈希表，只用于存储符号表
  sh: IMAGE_SECTION_HEADER; // 节头
};

export type CoffSym = {
  Name: number; // 符号名称
  Next: number; // 用于保存冲突链表*/
  Value: number; // 与符号相关的值
  Section: number; // 节表的索引(从1开始),用以标识定义此符号的节*/
  Type: number; // 一个表示类型的数字
  StorageClass: number; // 这是一个表示存储类别的枚举类型值
  NumberOfAuxSymbols: number; // 跟在本记录后面的辅助符号表项的个数
};

export const upperAndLowerCaseLetters = [
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

export const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']