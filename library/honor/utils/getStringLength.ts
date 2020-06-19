/**
 * @public
 * 获取字符串长度，支持中文
 * @param {String} str 要获取长度的字符串
 *
 * @return 字符串长度
 */
export function getStringLength(str: string) {
    return ('' + str.replace(/[^\x00-\xff]/gi, 'ox')).length;
}
