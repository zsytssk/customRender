import * as zTimer from './zTimer';
import { Sprite as LayaSprite } from 'laya/display/Sprite';
import { Tween } from 'laya/utils/Tween';
import { Ease } from 'laya/utils/Ease';
import { Handler } from 'laya/utils/Handler';

export type EaseFn = Func<void> | string;
export type Sprite = LayaSprite & {
    tween?: Tween;
    is_stop?: boolean;
    time_out?: any;
};
type Props<T> = { [k in keyof T]?: T[k] };

export function sleep(time: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time);
        }, time * 1000);
    });
}
export async function fade_in(
    sprite: Sprite,
    time?: number,
    ease_fn?: string,
    end_alpha = 1,
) {
    await completeAni(sprite);
    const start_props = {
        alpha: 0,
        visible: true,
    };
    time = time ? time : 700;
    ease_fn = ease_fn || 'circleOut';
    const end_props = {
        alpha: end_alpha,
    };
    return tween({
        ease_fn,
        end_props,
        sprite,
        start_props,
        time,
    });
}
export async function fade_out(
    sprite: Sprite,
    time?: number,
    ease_fn?: string,
) {
    await completeAni(sprite);
    time = time ? time : 700;
    ease_fn = ease_fn || 'circleOut';
    const end_props = {
        alpha: 0,
    };
    return tween({
        ease_fn,
        end_props,
        sprite,
        time,
    }).then(() => {
        sprite.visible = false;
        sprite.alpha = 1;
    });
}
export async function scale_in(
    sprite: Sprite,
    time?: number,
    ease_fn?: EaseFn,
) {
    await completeAni(sprite);
    ease_fn = ease_fn || 'circleIn';
    time = time || 400;
    const start_props = {
        alpha: 0.2,
        scaleX: 0.2,
        scaleY: 0.2,
        visible: true,
    };
    const end_props = {
        alpha: 1,
        scaleX: 1,
        scaleY: 1,
    };
    return tween({ sprite, start_props, end_props, time, ease_fn });
}
export async function scale_out(sprite: Sprite, time: number, ease_fn: EaseFn) {
    await completeAni(sprite);
    ease_fn = ease_fn || 'circleIn';
    time = time || 400;
    const end_props = {
        alpha: 0.2,
        scaleX: 0.2,
        scaleY: 0.2,
    };
    return tween({ sprite, end_props, time, ease_fn }).then(() => {
        setStyle(sprite, { visible: false, scaleX: 1, scaleY: 1, alpha: 1 });
    });
}
export async function slide_up_in(
    sprite: Sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    if (!space) {
        const height = sprite.getBounds().height;
        space = height > 50 ? 50 : height;
    }
    await completeAni(sprite);

    ease_fn = ease_fn || 'circleOut';
    time = time || 200;
    setStyle(sprite, {
        alpha: 0.2,
        visible: true,
    });
    const ori_y = sprite.y;
    const start_props = {
        y: ori_y + space,
    };
    const end_props = {
        alpha: 1,
        y: ori_y,
    };
    return tween({
        sprite,
        start_props,
        end_props,
        time,
        ease_fn,
    });
}
export async function slide_up_out(
    sprite: Sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    if (!space) {
        const height = sprite.getBounds().height;
        space = height > 50 ? 50 : height;
    }
    await completeAni(sprite);
    ease_fn = ease_fn || 'circleIn';
    time = time || 200;
    const ori_y = sprite.y;
    const end_props = {
        alpha: 1,
        y: ori_y - space,
    };
    await tween({ sprite, end_props, time, ease_fn }).then(() => {
        setStyle(sprite, { visible: false, alpha: 1, y: ori_y });
    });
}
export async function slide_down_in(
    sprite: Sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    if (!space) {
        const height = sprite.getBounds().height;
        space = height > 50 ? 50 : height;
    }
    await completeAni(sprite);
    ease_fn = ease_fn || 'circleOut';
    time = time || 200;
    setStyle(sprite, {
        alpha: 0.2,
        visible: true,
    });
    const ori_y = sprite.y;
    const start_props = {
        y: ori_y - space,
    };
    const end_props = {
        alpha: 1,
        y: ori_y,
    };
    await tween({ sprite, start_props, end_props, time, ease_fn });
}
export function slide_down_out(
    sprite: Sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    return new Promise(async (resolve, reject) => {
        if (!space) {
            const height = sprite.getBounds().height;
            space = height > 50 ? 50 : height;
        }
        await completeAni(sprite);
        /** 因为completeAni 导致的动画完成函数要异步执行
         * 所以为了等待原来的函数执行完成 所以他自己必须异步执行
         */
        setTimeout(() => {
            ease_fn = ease_fn || 'circleIn';
            time = time || 200;
            const ori_y = sprite.y;
            const end_props = {
                alpha: 0,
                y: ori_y + space,
            };
            return tween({ sprite, end_props, time, ease_fn }).then(() => {
                setStyle(sprite, { visible: false, alpha: 1, y: ori_y });
                resolve();
            });
        });
    });
}
export async function slide_left_in(
    sprite: Sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    if (!space) {
        const width = sprite.getBounds().width;
        space = width > 50 ? 50 : width;
    }
    await completeAni(sprite);
    ease_fn = ease_fn || 'easeIn';
    time = time || 200;
    setStyle(sprite, {
        alpha: 0.2,
        visible: true,
    });
    const ori_x = sprite.x;
    const start_props = {
        x: ori_x + space,
    };
    const end_props = {
        alpha: 1,
        x: ori_x,
    };
    return tween({ sprite, start_props, end_props, time, ease_fn });
}
export async function slide_left_out(
    sprite: Sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    if (!space) {
        const width = sprite.getBounds().width;
        space = width > 50 ? 50 : width;
    }
    await completeAni(sprite);
    ease_fn = ease_fn || 'circleIn';
    time = time || 200;
    const ori_x = sprite.x;
    const end_props = {
        alpha: 0,
        x: ori_x + space,
    };
    return tween({ sprite, end_props, time, ease_fn }).then(() => {
        sprite.visible = false;
        sprite.alpha = 1;
        sprite.x = ori_x;
    });
}
export async function slide_right_in(
    sprite: Sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    if (!space) {
        const width = sprite.getBounds().width;
        space = width > 50 ? 50 : width;
    }
    await completeAni(sprite);
    ease_fn = ease_fn || 'circleOut';
    time = time || 200;
    setStyle(sprite, {
        alpha: 0.2,
        visible: true,
    });
    const ori_x = sprite.x;
    const start_props = {
        x: ori_x - space,
    };
    const end_props = {
        alpha: 1,
        x: ori_x,
    };
    return tween({ sprite, start_props, end_props, time, ease_fn });
}
export async function slide_right_out(
    sprite: Sprite,
    time: number,
    ease_fn: EaseFn,
    space: number,
) {
    if (!space) {
        const width = sprite.getBounds().width;
        space = width > 50 ? 50 : width;
    }
    await completeAni(sprite);
    ease_fn = ease_fn || 'circleIn';
    time = time || 200;
    const ori_x = sprite.x;
    const end_props = {
        alpha: 0,
        x: ori_x - space,
    };
    return tween({ sprite, end_props, time, ease_fn }).then(() => {
        sprite.visible = false;
        sprite.alpha = 1;
        sprite.x = ori_x;
    });
}
export function rotate(
    sprite: Sprite,
    angle: number,
    time: number,
    ease_fn: EaseFn,
) {
    const ori_angle = Number(sprite.rotation);
    if (ori_angle !== ori_angle) {
        sprite.rotation = 0;
    }
    const end_props = {
        rotation: angle,
    };
    return tween({ sprite, end_props, time, ease_fn });
}
export function blink(sprite: Sprite, time: number) {
    tweenLoop({
        sprite,
        props_arr: [{ alpha: 1 }, { alpha: 0.3 }],
        time: time || 300,
    });
}
export async function move(
    sprite: Sprite,
    start_pos: Point,
    end_pos: Point,
    time: number,
    ease_fn?: string | FuncVoid,
) {
    await completeAni(sprite);
    setStyle(sprite, start_pos);

    return tween({
        sprite,
        end_props: end_pos,
        time,
        ease_fn,
    });
}

type TweenData = {
    sprite: Sprite;
    start_props?: Props<Sprite>;
    end_props: Props<Sprite>;
    time: number;
    ease_fn?: EaseFn;
};
export function tween(data: TweenData) {
    return new Promise(async (resolve, reject) => {
        const { sprite, start_props, end_props } = data;
        if (sprite.destroyed) {
            return reject();
        }
        await completeAni(sprite);
        let { ease_fn } = data;
        let { time } = data;
        const laya_Tween = new Tween();
        ease_fn = ease_fn || Ease.linearNone;
        if (typeof ease_fn === 'string') {
            ease_fn = Ease[ease_fn as keyof typeof Ease] as Func<void>;
        }
        setStyle(sprite, start_props);
        if (time === 0 || sprite.is_stop) {
            setStyle(sprite, end_props);
            resolve();
            return;
        }
        time = time || 300;
        /** 如果本身已经是那个属性就不做任何处理 */
        for (const key in end_props) {
            if (sprite[key] === end_props[key]) {
                delete end_props[key];
            }
        }
        if (!Object.keys(end_props).length) {
            resolve();
        }
        sprite.tween = laya_Tween.to(
            sprite,
            end_props,
            time,
            ease_fn,
            Handler.create(sprite, () => {
                if (!sprite.destroyed) {
                    resolve();
                } else {
                    reject();
                }
            }),
        );
    });
}
export function setStyle<T>(obj: Partial<T>, props: Partial<T>) {
    if (!props) {
        return;
    }
    for (const key in props) {
        if (!props.hasOwnProperty(key)) {
            continue;
        }
        obj[key] = props[key];
    }
}
function jump(sprite: Sprite, props: {}, time_num: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            setStyle(sprite, props);
            resolve();
        }, time_num);
    });
}

type StepAniParam = {
    props_arr: AnyObj[];
    step_fn: (props: any) => void;
    time?: number;
    loop?: boolean;
};
export function stepAni({
    props_arr,
    time = 300,
    loop = true,
    step_fn,
}: StepAniParam) {
    const len = props_arr.length;
    let time_out: number;
    let is_stop = false;
    async function runStep() {
        for (let i = 0; i < len; i++) {
            if (is_stop) {
                return;
            }
            await new Promise((resolve, reject) => {
                time_out = setTimeout(() => {
                    step_fn(props_arr[i]);
                    resolve();
                }, time) as any;
            });
            if (loop && i >= len - 1) {
                i = -1;
            }
        }
    }

    runStep();
    return () => {
        clearTimeout(time_out);
        is_stop = true;
    };
}

type TweenLoopParam = {
    sprite: Sprite;
    props_arr: AnyObj[];
    time: number;
    ease_fn?: EaseFn;
    is_jump?: boolean;
    end_jump?: boolean;
    step_fn?: (index: number) => void;
};
export function tweenLoop({
    sprite,
    props_arr,
    time,
    ease_fn,
    is_jump,
    end_jump,
    step_fn,
}: TweenLoopParam) {
    const len = props_arr.length;
    let i = 0;
    let n = 0;
    stopAni(sprite);
    /** 等待原来的动画结束再继续执行 */
    function runItem() {
        if (sprite.destroyed) {
            return;
        }
        if (is_jump) {
            jump(sprite, props_arr[i], time);
        } else {
            let next = i + 1;
            if (next >= len) {
                if (end_jump) {
                    i = 0;
                    next = 1;
                } else {
                    next = 0;
                }
            }
            const start_props = props_arr[i];
            const end_props = props_arr[next];
            tween({
                ease_fn,
                end_props,
                sprite,
                start_props,
                time,
            }).then(() => {
                step_fn(n);
                setTimeout(runItem, 0);
            });
        }
        i++;
        n++;
        if (i >= len) {
            i = 0;
        }
    }
    runItem();
}
export function countDown(
    caller: any,
    count: number,
    on_step: Func<void>,
    on_complete: Func<void>,
) {
    const start_props = {
        x: count,
    };
    const end_props = {
        x: 0,
    };
    const time = count * 1000;
    const step = count + 1;
    const step_fun = (step_props: { x: number }) => {
        on_step(Math.floor(step_props.x));
    };
    return tweenProps({
        callback: on_complete,
        caller,
        end_props,
        start_props,
        step,
        step_fun,
        time,
    });
}

type TweenFunParam = {
    callback: FuncVoid;
    caller: any;
    start_props: Props<Sprite>;
    end_props: Props<Sprite>;
    time: number;
    time_fun?: EaseFn;
    step_fun?: (step_props: Props<Sprite>, time: number) => void;
    step: number;
};
type TweenTmpItem = {
    caller: any;
    off: FuncVoid;
    callback: FuncVoid;
    step_fun: Func<void>;
};
export const tweenProps = (() => {
    const tmp: TweenTmpItem[] = [];
    function getVal(v1: number, v2: number, t: number) {
        return v1 + (v2 - v1) * t;
    }
    function completeNodeListener(caller: any, run?: boolean) {
        for (let i = tmp.length - 1; i >= 0; i--) {
            const caller_item = tmp[i].caller;
            const off = tmp[i].off;
            const callback = tmp[i].callback;
            if (caller_item !== caller) {
                continue;
            }
            if (run && callback && typeof callback === 'function') {
                callback();
            }
            if (off && typeof off === 'function') {
                off();
            }
            tmp.splice(i, 1);
        }
    }
    function tweenFun({
        callback,
        caller,
        start_props,
        end_props,
        time,
        time_fun,
        step_fun,
        step,
    }: TweenFunParam) {
        const time_step = step ? time / step : 1000 / 60;
        const total_step = time / time_step;

        let ease_fn: (a: number, b: number, c: number, d: number) => number;
        if (typeof time_fun === 'string') {
            ease_fn = Ease[time_fun as keyof typeof Ease] as Func<number>;
        }
        if (!ease_fn) {
            ease_fn = Ease.linearNone;
        }
        completeNodeListener(caller, true);
        if (!start_props) {
            start_props = {};
            for (const key of Object.keys(end_props)) {
                start_props[key] = caller[key] || 0;
            }
        }
        const calc_keys: string[] = [];
        for (const key of Object.keys(end_props)) {
            if (start_props[key] === end_props[key]) {
                continue;
            }
            calc_keys.push(key);
        }
        /** 所有属性都相同, 直接执行返回函数 */
        if (calc_keys.length === 0) {
            if (callback && typeof callback === 'function') {
                callback();
            }
            return;
        }
        const off = zTimer.loop(moveLoop, time_step);
        tmp.push({
            callback,
            caller,
            off,
            step_fun,
        });
        let cur_step = 0;
        function moveLoop(times: number) {
            /** 如果node已经被清除, 直接注销绑定 */
            if (caller.destroyed || caller.is_stop) {
                return completeNodeListener(caller);
            } else if (cur_step >= total_step) {
                return completeNodeListener(caller, true);
            }
            const temp_obj: Props<Sprite> = {};
            let t = cur_step / total_step;
            if (!time_fun) {
                t = ease_fn(t, 0, 1, 1);
            }
            if (cur_step >= total_step) {
                for (const key of calc_keys) {
                    temp_obj[key] = end_props[key];
                }
            } else {
                for (const key of calc_keys) {
                    temp_obj[key] = getVal(start_props[key], end_props[key], t);
                }
            }
            if (typeof step_fun === 'function') {
                step_fun(temp_obj, times);
            } else {
                for (const key in temp_obj) {
                    if (!temp_obj.hasOwnProperty(key)) {
                        continue;
                    }
                    temp_obj[key] = getVal(start_props[key], end_props[key], t);
                }
            }
            cur_step += times;
        }
        moveLoop(1);
        return (run: boolean) => {
            completeNodeListener(caller, run);
        };
    }
    return tweenFun;
})();
export function stopAni(sprite: Sprite | FuncVoid) {
    if (!sprite) {
        return;
    }
    if (typeof sprite === 'function') {
        return sprite();
    }
    if (sprite.time_out) {
        return clearTimeout(sprite.time_out);
    }
    if (sprite.tween) {
        sprite.tween.complete();
        sprite.tween.clear();
    }
}
export function completeAni(sprite: Sprite) {
    return new Promise((resolve, reject) => {
        if (!sprite) {
            return;
        }
        if (sprite.tween) {
            sprite.tween.complete();
            sprite.tween.clear();
            sprite.tween = undefined;
        }
        setTimeout(() => {
            resolve();
        });
    });
}
