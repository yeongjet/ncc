import { TkWord, TkCode, TypeCode, Type, Symbo, StorageClass, Section, CoffSym } from "./definition";
import { tk_hashtable, tktable, local_sym_stack, global_sym_stack } from './common'
import { isEqual, isObject, isString, keys } from "lodash";

const MAXKEY = 1024			// 哈希表容量

const elf_hash = (key: string) =>
{
    let h = 0, g
    for(const c of key) {
        h = (h << 4) + c.charCodeAt(0);
        g = h & 0xf0000000;
        if (g)
            h ^= g >> 24;
        h &= ~g;
    }
    return h % MAXKEY;
}

let token: TkCode

const tkword_find = (p: string, keyno: number) => {
    let t: TkWord | null = tk_hashtable[keyno] 
    while (t) {
        if (t.spelling === p) {
            token =  t.tkcode
            return t
        }
        t = t.next
    }
    return null
}

export const tkword_insert = (p: string) => {
    const keyno = elf_hash(p);	
    let tp: TkWord | null = tkword_find(p, keyno);
	if(!tp)
	{
        tp = {
            tkcode: tktable.length,
            next: tk_hashtable[keyno],
            spelling: p,
            sym_struct: null,
            sym_identifier: null
        }
        tk_hashtable[keyno] = tp
        tktable.push(tp)
	}
    return tp;
}

export const sec_sym_put = (sec: string, c: number) => {
	const type = { t: TypeCode.T_INT, ref: null }
	const tp = tkword_insert(sec);
	token = tp.tkcode;
	const s = sym_push(token, type, StorageClass.SC_GLOBAL, c); 
	return s;
}

export const sym_push = (v: number, type: Type, r: number, c: number) => {
    const stack = local_sym_stack.length > 0 ? local_sym_stack : global_sym_stack
	const s: Symbo = {
        v,
        r,
        c,
        type: {
            t: type.t,
            ref: type.ref
        },
        next: null,
        prev_tok: null
    }
    stack.push(s)
    // 不记录SC_ANOM,SC_MEMBER,SC_PARAMS
	if((v === StorageClass.SC_STRUCT) || v < StorageClass.SC_ANOM) {
        // 更新单词sym_struct或sym_identifier字段
        const ts = tktable[(v & ~StorageClass.SC_STRUCT)];
        if (v === StorageClass.SC_STRUCT) {
            s.prev_tok = ts.sym_struct
            ts.sym_struct = s
        } else {
            s.prev_tok = ts.sym_identifier
            ts.sym_identifier = s
        }
    }
    return s;
}

export const mk_pointer = (t: Type) => {
    t.t = TypeCode.T_PTR
    t.ref = sym_push(StorageClass.SC_ANOM, t, 0, -1)
}

const isCoffSym = (data: string | CoffSym) => {
    return isObject(data) && isEqual([
        'Name',
        'Next',
        'NumberOfAuxSymbols',
        'Section',
        'StorageClass',
        'Type',
        'Value'
      ],keys(data).sort())
}

export const getSectionDataLength = (sectionData: Section['data']) => {
    let length = 0
    for(const data of sectionData) {
        if (isString(data)) {
            length += (data.length+1)
        } else if (isCoffSym(data)) {
            length += 30
        }
    }
    return length
}

export const coffsym_add = (symtab: Section, name: string, value: number, sec_index: number,
   type: number, StorageClass: number) => {
    const cfsym: CoffSym = {
        Name: getSectionDataLength(symtab.link.data),
        Value: value,
        Section: sec_index,
        Type: type,
        StorageClass,
        Next: symtab.hashtab[name],
        NumberOfAuxSymbols: 0
    }
    symtab.hashtab[name] = getSectionDataLength(symtab.data),
    symtab.link.data.push(name)
    symtab.data.push(cfsym)
}
