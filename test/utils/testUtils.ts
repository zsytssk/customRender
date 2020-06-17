import { Utils } from 'laya/utils/Utils';
import { Laya } from 'Laya';
import { Sprite } from 'laya/display/Sprite';

export function sleep(time: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time * 1000);
    });
}
export function nameMap(path: string | string[], end_obj: any, obj?: any) {
    if (typeof path === 'string') {
        path = path.split('.');
    }
    if (!obj) {
        obj = window;
    }
    const cur_path = path.shift() as string;
    if (path.length === 0) {
        obj[cur_path] = end_obj;
        return;
    }

    if (!obj[cur_path]) {
        obj[cur_path] = {};
    }
    nameMap(path, end_obj, obj[cur_path]);
}
export function injectWindow(obj: { [key: string]: any }) {
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        nameMap(key, obj[key]);
    }
}

let test_ignore_arr: string[] = [];
/** 测试是否需要跳过 */
export function getTestIgnore() {
    if (!test_ignore_arr.length) {
        const test_str = getUrlVars('test_ignore');
        if (!test_str) {
            return test_ignore_arr;
        }
        test_ignore_arr = test_str.split(',');
    }
    return test_ignore_arr;
}

let test_enable_arr: string[] = [];
/** 测试开启 */
export function getTestEnable() {
    if (!test_enable_arr.length) {
        const test_str = getUrlVars('test_enable');
        if (!test_str) {
            return test_enable_arr;
        }
        test_enable_arr = test_str.split(',');
    }
    return test_enable_arr;
}

function getUrlVars(name: string) {
    var vars = {} as { [key: string]: string };
    window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        (m, key, value) => (vars[key] = value),
    );
    return vars[name];
}

/** 检测stage上点击元素 */
export function stageClick() {
    Laya.stage.on('click', null, (e: Event) => {
        console.log(`test:>`, e.target);
    });
}
export function showNodeZone(sprite: Sprite) {
    sprite.graphics.alpha(0.3);
    sprite.graphics.drawRect(0, 0, sprite.width, sprite.height, '#000');
}

export function getParams(name: string) {
    return Utils.getQueryString(name);
}
