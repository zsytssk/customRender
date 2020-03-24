export type ReplaceFun = (match: RegExpExecArray) => string;

export function replaceReg(
    str: string,
    reg: RegExp,
    replace_str: string | ReplaceFun,
) {
    const matches = findMatches(str, reg);
    let result_data = str;
    for (let len = matches.length, i = len - 1; i >= 0; i--) {
        const match = matches[i];

        let rep_str_r;
        if (typeof replace_str === 'string') {
            rep_str_r = replace_str;
        } else {
            rep_str_r = replace_str(match);
        }

        let result_arr;
        if (i === len - 1) {
            result_arr = [
                result_data.slice(0, match.index),
                result_data.slice(match.index),
            ];
        } else {
            result_arr = [
                result_data.slice(0, match.index),
                result_data.slice(match.index, matches[i + 1].index),
                result_data.slice(matches[i + 1].index),
            ];
        }
        result_arr[1] = result_arr[1].replace(match[0], rep_str_r);
        result_data = result_arr.join('');
    }

    return result_data;
}

function findMatches(str: string, reg: RegExp) {
    const matches = [] as RegExpExecArray[];

    let m: RegExpExecArray;
    // tslint:disable-next-line:no-conditional-assignment
    while ((m = reg.exec(str) as RegExpExecArray)) {
        matches.push(m);
    }
    return matches;

    // const matches = (str as any).matchAll(reg);
    // return [...matches];
}
