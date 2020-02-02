import { Laya } from 'laya/Laya';

type Listener = (t: number) => void;
type FunItem = {
    fn: Listener;
    index: number;
};
const tick_time = 1000 / 30;
const tick = tick_time / (1000 / 60);

const fun_list: Set<FunItem> = new Set();
let looping = false;
let index = 0;
let pre_time: number;
function update() {
    let now_tick = tick;
    if (!pre_time) {
        pre_time = Date.now();
    } else {
        const now = Date.now();
        const dist_time = now - pre_time;
        now_tick = Math.floor((dist_time / tick_time) * tick);
        const more_dist_time = dist_time - (now_tick / tick) * tick_time;
        pre_time = now - more_dist_time;
    }

    for (const item of fun_list) {
        item.fn(now_tick);
    }
}

/** 创建游戏定时器, 用来做鱼|子弹更新位置 碰撞检测, 时间是固定的 */
export function createTick(fn: Listener) {
    if (!looping) {
        looping = true;
        Laya.timer.loop(tick_time, null, update);
    }
    index++;
    fun_list.add({
        fn,
        index,
    });

    return index;
}

export function clearTick(_index: number) {
    for (const item of fun_list) {
        if (item.index === _index) {
            fun_list.delete(item);
        }
    }

    if (fun_list.size === 0) {
        Laya.timer.clear(null, update);
        looping = false;

        // 如果不清0, 就会导致 createTick 的第一个tick飞很远
        pre_time = 0;
    }
}
