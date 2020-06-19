/**
 * @public
 * 按指定长度截取字符串
 * @param {String} str 要截取长度的字符串
 * @param {Number} length 字符串长度
 *
 * @return 截取长度后的字符串
 */
export function cutStr(text: string, length: number) {
    text = text + '';
    const reg = /[^\x00-\xff]/g;
    const r = text.replace(reg, 'mm');
    if (r.length <= length) {
        return text;
    }
    const m = Math.floor(length / 2);
    for (let i = m; i < text.length; i++) {
        if (text.substr(0, i).replace(reg, 'mm').length >= length) {
            return text.substr(0, i) + '...';
        }
    }
    return text;
}
