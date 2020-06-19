/**
 * @public
 * 将毫秒转换为`{h}小时{m}分钟{s}秒`的格式
 * @param total 秒数
 * @param min 是否是精简模式, 会将无用的部分去掉
 *
 * @return 格式化后的字符串
 */
export function formatTime(
    total: number,
    format: string | string[] = ['小时', '分钟', '秒'],
    min = false,
): string {
    let time = '';
    let h = 0;
    let m = 0;
    const s = total % 60;
    if (typeof format === 'string') {
        /** xx::xx::xx 最后不需要:: */
        format = [format, format, ''];
    }

    if (total >= 60) {
        m = (total / 60) | 0;
    }
    if (m >= 60) {
        h = (m / 60) | 0;
        m = m % 60;
    }

    const time_arr = [h, m, s];
    for (let i = 0, al = time_arr.length; i < al; i++) {
        const item = time_arr[i];
        if (min && !item) {
            continue;
        }
        min = false;
        time += formatTimeZone(item) + format[i];
    }
    return time;
}

/**
 * @public
 * 将毫秒转换为`1天1小时1分钟1秒`的格式，小于1的部分将不会出现（精简模式）
 * @param seconds 秒数
 *
 * @return 格式化后的字符串
 */
export function formatTimeLight(seconds: number){
    let time = ''
    let [d, h, m, s] = [0, 0, 0, seconds%60];
    if (seconds > 60) {
        m = (seconds / 60) | 0;
    }
    if (m > 60) {
        h = (m / 60) | 0;
        m = m % 60;
    }
    if (h > 24) {
        d = (h / 24) | 0;
        h = h % 24;
    }
    const time_arr = [d, h, m, s];
    const time_unit = ['天', '小时', '分', '秒'];
    for (const [i, count] of time_arr.entries()) {
        if (count > 0) {
            time = `${time}${count}${time_unit[i]}`;
        }
    }

    return time;
}

function formatTimeZone(val: number): string {
    return val > 9 ? val + '' : '0' + val;
}
