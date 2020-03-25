import { readFile } from '../zutil/ls/asyncUtil';
type Item = {
    name: string;
    props: { [key: string]: any };
    children: Item[];
};
type Ref = {
    [key: string]: any;
};
const file_str = `
$0
$3
export function $1($5) {
$4
    return(
        $2
    );
}`;
const jsx_tpl1 = `<$1 $2>$3$4</$1>`;
const jsx_tpl2 = `<$1 $2 />`;
const ref_tpl1 = `export type RefObj = {$1};`;
const ref_tpl2 = `const $1 = useRef(null as $2);`;
const import_tpl = `import $1 from '$2'`;
const ignore_props = ['sceneColor', 'sceneBg'];
const is_num_props = ['stateNum'];

export async function parseFile(name: string, file: string) {
    const con = await readFile(file);
    const json_con = JSON.parse(con);
    const { item: info, types } = convertItem(json_con);
    const import_map = {
        customRenderer: types,
        react: [':React'],
    };
    const first_char = name[0];
    const upper_char = first_char.toUpperCase();
    const { jsx, ref } = convertObjToXml(info, 2);
    const has_ref = isEmptyObj(ref);

    name = name.replace(first_char, upper_char);
    name += 'Ui';

    if (has_ref) {
        import_map.react.push('useRef');
    }
    const import_str = genImport(import_map);
    let output = file_str.replace('$0', import_str);
    output = output.replace('$1', name);
    output = output.replace('$2', jsx);
    if (has_ref) {
        const [ref1, ref2] = genRef(ref);
        output = output.replace('$3', ref1);
        output = output.replace('$4', ref2);
        output = output.replace('$5', 'props: {sub_ref: RefObj}');
    } else {
        output = output.replace('\n$3', '');
        output = output.replace('\n$4', '');
        output = output.replace('$5', '');
    }

    return output;
}

function convertObjToXml(obj: Item, deep = 0) {
    const { name, props, children } = obj;
    let props_str = '';
    let children_str = '';
    let ref = {} as Ref;
    for (let key in props) {
        if (!props.hasOwnProperty(key)) {
            continue;
        }
        if (ignore_props.indexOf(key) !== -1) {
            continue;
        }
        let value = props[key];
        if (key === 'var') {
            key = 'ref';
            ref[value] = name;
            value = `{${value}}`;
        } else if (is_num_props.indexOf(key) !== -1) {
            value = `{${value}}`;
        } else if (typeof value === 'string') {
            value = `"${value}"`;
        } else {
            value = `{${value}}`;
        }
        props_str += `${key}=${value} `;
    }
    props_str = props_str.trimRight();
    for (const item of children) {
        const { jsx: item_jsx, ref: item_ref } = convertObjToXml(
            item,
            deep + 1,
        );
        children_str += genTab(deep + 1) + `${item_jsx}`;
        ref = {
            ...ref,
            ...item_ref,
        };
    }

    let jsx = '';
    if (children_str) {
        jsx = jsx_tpl1.replace(/\$3/g, children_str);
        jsx = jsx.replace(/\$4/g, genTab(deep));
    } else {
        jsx = jsx_tpl2;
    }
    jsx = jsx.replace(/\$1/g, name);
    jsx = jsx.replace(/\$2/, props_str);

    return {
        jsx,
        ref,
    };
}

function convertItem(info: any): { item: Item; types: string[] } {
    const { type: name, props, child } = info;
    const children = [] as Item[];
    let types = [] as string[];
    types.push(name);
    for (const item_info of child) {
        const { item, types: item_types } = convertItem(item_info);
        types = types.concat(item_types);
        children.push(item);
    }
    return {
        types,
        item: {
            name,
            props,
            children,
        },
    };
}

function genRef(ref: Ref) {
    let ref_str1 = '';
    let ref_str2 = '';
    const ref_arr = [] as string[];
    for (const key in ref) {
        if (!ref.hasOwnProperty(key)) {
            continue;
        }
        const item_type = ref[key];
        const item_ref1 = `${key}: React.MutableRefObject<${item_type}>;`;
        const item_ref2 = ref_tpl2.replace('$1', key).replace('$2', item_type);
        ref_str1 += item_ref1;
        ref_str2 += genTab(1, false) + item_ref2 + '\n';
        ref_arr.push(key);
    }

    ref_str1 = ref_tpl1.replace('$1', ref_str1);
    ref_str2 += genTab(1, false) + `const {sub_ref} = props;\n`;
    for (const item of ref_arr) {
        ref_str2 += genTab(1, false) + `sub_ref.${item} = ${item};` + '\n';
    }
    return [ref_str1, ref_str2];
}

function genImport(import_map: { [key: string]: string[] }) {
    let import_str = '';
    for (const key in import_map) {
        if (!import_map.hasOwnProperty(key)) {
            continue;
        }

        let type_out = '';
        let type_inner = '';
        const types = import_map[key];
        const trim_types = types.filter((item, index) => {
            return types.indexOf(item) === index;
        });
        for (let type_item of trim_types) {
            let is_out = false;
            if (type_item.indexOf(':') !== -1) {
                is_out = true;
                type_item = type_item.replace(':', '');
            }
            if (is_out) {
                type_out = `${type_item}`;
            } else {
                type_inner += `${type_item}, `;
            }
        }
        let type_str = `${type_out}`;
        if (type_inner) {
            if (type_str) {
                type_str += ', ';
            }
            type_inner = type_inner.substring(0, type_inner.length - 2);
            type_str += `{${type_inner}}`;
        }

        let item_str = import_tpl.replace('$2', key);
        item_str = item_str.replace('$1', type_str);
        import_str += `${item_str};\n`;
    }

    return import_str;
}

function isEmptyObj(obj: {}) {
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        return true;
    }
    return false;
}
function genTab(n: number, withBr = true) {
    let result = withBr ? '\n' : '';
    for (let i = 0; i < n; i++) {
        result += '    ';
    }
    return result;
}
