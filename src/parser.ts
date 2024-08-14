import { Section, Symbo, TkCode, Type, numbers, nondigit } from "./definition"
import { tkword_insert } from "./util"
import fs from 'fs'

let lineNumber = 1,
    col = 1,  // TODO
    p = -1,
    s = '',
    token: { code: TkCode, value?: number | string }

const getToken = () => {
    while (true) {
        p++
        if (s[p] === '/') {
            if (s[p+1] === '*') {
                p += 2
                while(true){
                    if (!s[p]) {
                        throw Error('Incomplete comment')
                    }
                    if (s[p] === '*' && s[p+1] === '/') {
                        p++
                        break
                    }
                    if (s[p] === '\n') {
                        lineNumber++
                    }
                    p++
                }
            } else if (s[p+1] === '/') {
                p += 2
                while (true) {
                    if (!s[p]) {
                        token = { code: TkCode.TK_EOF }
                        break
                    }
                    if (s[p] === '\n') {
                        break
                    }
                    p++
                }
            }
            // TODO
            // else if (s[p+1] === '=') {

            // }
            else {
                token = { code: TkCode.TK_DIVIDE }
                break
            }
        } else if (nondigit.includes(s[p])) {
            let identifier = s[p]
            p++
            while([...nondigit, ...numbers].includes(s[p])){
                identifier += s[p]
                p++
            }
            const { tkcode } = tkword_insert(identifier)
            token = { code: tkcode }
            break
        } else if (numbers.includes(s[p])) {
            let number = s[p]
            p++
            while(numbers.includes(s[p])) {
                number += s[p]
                p++
            }
            if (s[p] === '.') {
                number += s[p]
                p++
                while(numbers.includes(s[p])) {
                    number += s[p]
                    p++
                }
            }
            token = { code: TkCode.TK_CINT, value: parseInt(number) }
            break
        } else if (s[p] === '+') {
            token = { code: TkCode.TK_PLUS }
            break
        } else if (s[p] === '-') {
            if (s[p+1] === '>') {
                token = { code: TkCode.TK_POINTSTO }
                p++
            } else {
                token = { code: TkCode.TK_MINUS }
            }
            break
        } else if (s[p] === '%') {
            token = { code: TkCode.TK_MOD }
            break
        } else if (s[p] === '=') {
            if (s[p+1] === '=') {
                token = { code: TkCode.TK_EQ }
                p++
            } else {
                token = { code: TkCode.TK_ASSIGN }
            }
            break
        } else if (s[p] === '!') {
            if (s[p+1] === '=') {
                token = { code: TkCode.TK_NEQ }
                p++
            } else {
                //TODO
                throw Error('Unsupported Operator:"!"')
            }
            break
        } else if (s[p] === '<') {
            if (s[p+1] === '=') {
                token = { code: TkCode.TK_LEQ }
                p++
            } else {
                token = { code: TkCode.TK_LT }
            }
            break
        } else if (s[p] === '>') {
            if (s[p+1] === '=') {
                token = { code: TkCode.TK_LEQ }
                p++
            } else {
                token = { code: TkCode.TK_LT }
            }
            break
        } else if (s[p] === '.') {
            if (s[p+1] === '.') {
                if (s[p+2] === '.') {
                    token = { code: TkCode.TK_ELLIPSIS }
                    p+=2
                } else {
                    throw Error('ellipsis spelling error')
                }
            } else {
                token = { code: TkCode.TK_LT }
            }
            break
        } else if (s[p] === '&') {
            token = { code: TkCode.TK_AND }
            break
        } else if (s[p] === ';') {
            token = { code: TkCode.TK_SEMICOLON }
            break
        } else if (s[p] === ']') {
            token = { code: TkCode.TK_CLOSEBR }
            break
        } else if (s[p] === '}') {
            token = { code: TkCode.TK_END }
            break
        } else if (s[p] === ')') {
            token = { code: TkCode.TK_CLOSEPA }
            break
        } else if (s[p] === '[') {
            token = { code: TkCode.TK_OPENBR }
            break
        } else if (s[p] === '{') {
            token = { code: TkCode.TK_BEGIN }
            break
        } else if (s[p] === ',') {
            token = { code: TkCode.TK_COMMA }
            break
        } else if (s[p] === '(') {
            token = { code: TkCode.TK_OPENPA }
            break
        } else if (s[p] === '*') {
            token = { code: TkCode.TK_STAR }
            break
        } else if (s[p] === '\'' || s[p] === '\"') {
            const code = s[p] === '\'' ? TkCode.TK_CCHAR : TkCode.TK_CSTR
            let value = ''
            while(true) {
                p++
                if(s[p] === s[p]) {
                    break
                }else if (s[p] === '\\') {
                    p++
                    if (['0', 'a', 'b', 't', 'n', 'v', 'f', 'r', '"', '\'', '\\'].includes(s[p])) {
                        value += `\\${s[p]}`
                    } else {
                        throw Error(`Unknown escape character: \\${s[p]}`)
                    }
                } else {
                    value += s[p]
                }
            }
            token = { code, value }
            break
        } else if (s[p] === undefined) {
            token = { code: TkCode.TK_EOF }
            break
        } else {
            throw Error('unknow token')
        }
        if (s[p] === '\n') {
            lineNumber++
            col = 1
        }
    }
}

const external_declaration = () => {
	let btype: Type, type: Type, v: number, has_init: boolean, r,addr: number
	let sym: Symbo
	let sec: Section

	if (!type_specifier(&btype)) 
	{
		expect("<类型区分符>");
	}
	
	if (btype.t == T_STRUCT && token == TK_SEMICOLON) 
	{
		get_token();
		return;
	}
    while (1) 
	{
		type = btype;
		declarator (&type, &v,NULL);

		if (token == TK_BEGIN) //函数定义
		{
			if (l == SC_LOCAL)
				error("不支持函数嵌套定义");
			
			if ((type.t & T_BTYPE) != T_FUNC)
				expect("<函数定义>");	
			
			sym = sym_search(v);
			if (sym)	// 函数前面声明过，现在给出函数定义
			{
				if ((sym->type.t & T_BTYPE) != T_FUNC)
					error("'%s'重定义", get_tkstr(v));
				sym->type = type;
			}
			else
			{				
				sym = func_sym_push(v, &type);
			}
			sym->r = SC_SYM | SC_GLOBAL;
			funcbody(sym);
			break;
		}
		else
		{
			if ((type.t & T_BTYPE) == T_FUNC) // 函数声明
			{
				if (sym_search(v) == NULL)
				{
					sym_push(v, &type, SC_GLOBAL | SC_SYM, 0);
				}
			}
			else //变量声明
			{
				r=0;
				if (!(type.t & T_ARRAY))
					r |= SC_LVAL;
				
				r |= l;
				has_init = (token == TK_ASSIGN);

				if(has_init)
				{
					get_token(); //不能放到后面，char str[]="abc"情况，需要allocate_storage求字符串长度				    
				}
		
				sec = allocate_storage(&type,r, has_init, v, &addr); 
			    sym = var_sym_put(&type, r, v, addr);
				if(l == SC_GLOBAL)
					coffsym_add_update(sym, addr, sec->index,0,IMAGE_SYM_CLASS_EXTERNAL); 

				if(has_init)
				{
					initializer(&type, addr, sec);
				}
			}
		    if (token == TK_COMMA) 
			{
				get_token();
			}
			else
			{
			  syntax_state = SNTX_LF_HT;
			  skip(TK_SEMICOLON);
			  break;
			}			
		}
	}	
}


export const parse = (filePath: string) => {
    s = fs.readFileSync(filePath, 'utf-8')
    getToken()
    while(token.code !== TkCode.TK_END) {
        external_declaration()
    }
}