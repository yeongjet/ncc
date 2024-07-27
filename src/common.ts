import { Section, Symbo, TkCode, TkWord } from "./definition";
import {
  IMAGE_SCN_CNT_CODE,
  IMAGE_SCN_CNT_INITIALIZED_DATA,
  IMAGE_SCN_CNT_UNINITIALIZED_DATA,
  IMAGE_SCN_LNK_REMOVE,
  IMAGE_SCN_MEM_EXECUTE,
  IMAGE_SCN_MEM_READ,
  IMAGE_SCN_MEM_WRITE,
} from "./definition/windows";

export const local_sym_stack: Symbo[] = []
export const global_sym_stack: Symbo[] = []
export const tk_hashtable: Record<number, TkWord> = {}

export const tktable: TkWord[] = [
  [TkCode.TK_PLUS, "+"],
  [TkCode.TK_MINUS, "-"],
  [TkCode.TK_STAR, "*"],
  [TkCode.TK_DIVIDE, "/"],
  [TkCode.TK_MOD, "%"],
  [TkCode.TK_EQ, "=="],
  [TkCode.TK_NEQ, "!="],
  [TkCode.TK_LT, "<"],
  [TkCode.TK_LEQ, "<="],
  [TkCode.TK_GT, ">"],
  [TkCode.TK_GEQ, ">="],
  [TkCode.TK_ASSIGN, "="],
  [TkCode.TK_POINTSTO, "->"],
  [TkCode.TK_DOT, "."],
  [TkCode.TK_AND, "&"],
  [TkCode.TK_OPENPA, "("],
  [TkCode.TK_CLOSEPA, ")"],
  [TkCode.TK_OPENBR, "["],
  [TkCode.TK_CLOSEBR, "]"],
  [TkCode.TK_BEGIN, "{"],
  [TkCode.TK_END, "}"],
  [TkCode.TK_SEMICOLON, ";"],
  [TkCode.TK_COMMA, ","],
  [TkCode.TK_ELLIPSIS, "..."],
  [TkCode.TK_EOF, "End_Of_File"],
  [TkCode.TK_CINT, "整型常量"],
  [TkCode.TK_CCHAR, "字符常量"],
  [TkCode.TK_CSTR, "字符串常量"],
  [TkCode.KW_CHAR, "char"],
  [TkCode.KW_SHORT, "short"],
  [TkCode.KW_INT, "int"],
  [TkCode.KW_VOID, "void"],
  [TkCode.KW_STRUCT, "struct"],
  [TkCode.KW_IF, "if"],
  [TkCode.KW_ELSE, "else"],
  [TkCode.KW_FOR, "for"],
  [TkCode.KW_CONTINUE, "continue"],
  [TkCode.KW_BREAK, "break"],
  [TkCode.KW_RETURN, "return"],
  [TkCode.KW_SIZEOF, "sizeof"],
  [TkCode.KW_ALIGN, "__align"],
  [TkCode.KW_CDECL, "__cdecl"],
  [TkCode.KW_STDCALL, "__stdcall"],
].map(
  ([tkcode, spelling]) =>
    ({
      tkcode,
      spelling,
      next: null,
      sym_struct: null,
      sym_identifier: null,
    } as TkWord)
);

export const sections = [
  [".text", IMAGE_SCN_MEM_EXECUTE | IMAGE_SCN_CNT_CODE],
  [
    ".data",
    IMAGE_SCN_MEM_READ | IMAGE_SCN_MEM_WRITE | IMAGE_SCN_CNT_INITIALIZED_DATA,
  ],
  [".rdata", IMAGE_SCN_MEM_READ | IMAGE_SCN_CNT_INITIALIZED_DATA],
  [
    ".idata",
    IMAGE_SCN_MEM_READ | IMAGE_SCN_MEM_WRITE | IMAGE_SCN_CNT_INITIALIZED_DATA,
  ],
  [
    ".bss",
    IMAGE_SCN_MEM_READ | IMAGE_SCN_MEM_WRITE | IMAGE_SCN_CNT_UNINITIALIZED_DATA,
  ],
  [".rel", IMAGE_SCN_LNK_REMOVE | IMAGE_SCN_MEM_READ],
  [".symtab", IMAGE_SCN_LNK_REMOVE | IMAGE_SCN_MEM_READ],
  [".strtab", IMAGE_SCN_LNK_REMOVE | IMAGE_SCN_MEM_READ],
  [".dynsym", IMAGE_SCN_LNK_REMOVE | IMAGE_SCN_MEM_READ],
  [".dynstr", IMAGE_SCN_LNK_REMOVE | IMAGE_SCN_MEM_READ],
].map(
  ([Name, Characteristics], index) =>
    ({
      sh: {
        Name,
        Misc: {
          PhysicalAddress: 0,
          VirtualSize: 0,
        },
        Characteristics,
        VirtualAddress: 0,
        SizeOfRawData: 0,
        PointerToRawData: 0,
        PointerToRelocations: 0,
        PointerToLinenumbers: 0,
        NumberOfRelocations: 0,
        NumberOfLinenumbers: 0,
      },
      index: index + 1,
      data: "",
      data_offset: 0,
    } as Section)
);
