import {
    CoffSym,
  Operand,
  Section,
  StorageClass,
  TkCode,
  TkWord,
  Type,
  TypeCode,
} from "./definition";
import { coffsym_add, getSectionDataLength, mk_pointer, sec_sym_put, sym_push } from "./util";
import { sections } from './common'
import { IMAGE_SYM_CLASS_NULL, IMAGE_SYM_CLASS_STATIC } from "./definition/windows";
import * as parser from './parser'
import fs from 'fs'
import path from 'path'

const char_pointer_type: Type = { t: TypeCode.T_CHAR, ref: null };
const opstack: Operand[] = [];

const int_type: Type = { t: TypeCode.T_INT, ref: null };
const default_func_type: Type = {
  t: TypeCode.T_FUNC,
  ref: sym_push(StorageClass.SC_ANOM, int_type, TkCode.KW_CDECL, 0),
};
const sym_sec_rdata = sec_sym_put(".rdata", 0);
let nsec_image = 5;
let lib_path = '';
mk_pointer(char_pointer_type);

const [
  sec_text,
  sec_data,
  sec_rdata,
  sec_idata,
  sec_bss,
  sec_rel,
  sec_symtab,
  sec_strtab,
  sec_dynsymtab,
  sec_dynstrtab,
] = sections;
sec_symtab.link = sec_strtab
sec_dynsymtab.link = sec_dynstrtab

coffsym_add(sec_symtab, '', 0, 0, 0, IMAGE_SYM_CLASS_NULL)
coffsym_add(sec_symtab, '.data', 0, sec_data.index, 0, IMAGE_SYM_CLASS_STATIC)
coffsym_add(sec_symtab, '.bss', 0, sec_bss.index, 0, IMAGE_SYM_CLASS_STATIC)
coffsym_add(sec_symtab, '.rdata', 0, sec_rdata.index, 0, IMAGE_SYM_CLASS_STATIC)
coffsym_add(sec_dynsymtab, '', 0, sec_rdata.index, 0, IMAGE_SYM_CLASS_STATIC)



parser.parse(path.join(__dirname, '../test.c', 'utf-8'))