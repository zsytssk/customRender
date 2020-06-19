export function removeItem(key: string) {
    localStorage.removeItem(key);
}
export function setItem(key: string, data: string, expire_day = 0) {
    if (expire_day) {
        const expire_time = Number(expire_day) * 24 * 60 * 60 * 1000;
        data = `${data}|${expire_time}|${Date.now()}`;
    }
    localStorage.setItem(key, data);
}
export function getItem(key: string) {
    const ori_data = localStorage.getItem(key);

    if (!ori_data) {
        return ori_data;
    }

    const [data, expire_time_str, save_time_str] = ori_data.split('|');
    if (!expire_time_str) {
        return data;
    }
    const expire_time = Number(expire_time_str);
    const save_time = Number(save_time_str);
    const now = Date.now();
    const not_expire = now - save_time < expire_time;
    if (not_expire) {
        return data;
    }
    localStorage.removeItem(key);
    return null;
}
