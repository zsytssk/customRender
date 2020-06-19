import Bezier from 'bezier-js';
import { PATH } from 'data/path';
import { FishSpriteInfo } from 'data/sprite';
import GameConfig from 'GameConfig';
import SAT from 'sat';
import { getSpriteInfo } from 'utils/dataUtil';
import { Curve, CurveInfo, Displace } from './displace';
import { FUNCTION } from './function';
import { Line } from './line';

export const stage_width = GameConfig.width;
export const stage_height = GameConfig.height;

/** 寻找屏幕中一个点的朝着一个方向的直线 离开屏幕的点 */
export function getLineOutPoint(point: Point, derivative: SAT.Vector) {
    /** 结束坐标 */
    let out_p: Point;

    /** x = 0 | 1334 和直线的交点 */
    let x1 = 0;
    let y1: number;
    let dx1: number;
    let dy1: number;
    dx1 = x1 - point.x;
    /** 如果两个 */
    if (dx1 * derivative.x < 0) {
        x1 = GameConfig.width;
        dx1 = x1 - point.x;
    }
    dy1 = (dx1 * derivative.y) / derivative.x;
    y1 = dy1 + point.y;

    const d1 = x1 * x1 + y1 * y1;
    /** y = 0 | 750 和直线的交点 */
    let x2 = 0;
    let y2: number;
    let dx2: number;
    let dy2: number;
    dy2 = y2 - point.y;
    if (dy2 * derivative.y < 0) {
        y2 = GameConfig.height;
        dy2 = y2 - point.y;
    }
    dx2 = (dy2 * derivative.x) / derivative.y;
    x2 = dx2 + point.x;
    const d2 = x2 * x2 + y2 * y2;

    if (d1 < d2) {
        out_p = {
            x: x1,
            y: y1,
        };
    } else {
        out_p = {
            x: x2,
            y: y2,
        };
    }

    return out_p;
}

/** 将时间秒转化为帧, 一秒 = 60帧 */
export function timeToFrame(time: number) {
    return Math.ceil(time * 60);
}

type OffsetPos = 'before' | 'after';
/** 鱼游动的路程是 路径的长度+鱼的长度, 路径前后分别添加半个鱼的长度作为进入+离开, 不会突然出现 */
export function createSpace(
    position: OffsetPos,
    start_pos: Point,
    derivative: Point,
    fish_type: string,
) {
    const sprite_info = getSpriteInfo('fish', fish_type) as FishSpriteInfo;
    const ani_type = sprite_info.ani_type;

    /** 鱼的长度 */
    let fish_len: number;
    let direction: SAT.Vector;
    if (sprite_info.offset && ani_type === 'horizon_turn') {
        const info = calcFixLen(start_pos, fish_type);
        fish_len = info.fish_len;
        direction = info.derivative;
    } else {
        fish_len = calcNormalLen(position, fish_type);
        direction = new SAT.Vector(derivative.x, derivative.y).normalize();
        if (position === 'before') {
            direction = direction.reverse();
        }
    }

    const d_len = direction.scale(fish_len, fish_len);
    const end_pos = {
        x: start_pos.x + d_len.x,
        y: start_pos.y + d_len.y,
    };
    let line;
    if (position === 'before') {
        // 如果在前面添加距离, 起点end_pos为起点加上距离, 终点为起点
        line = new Line(end_pos, start_pos);
    } else {
        // 如果在前面添加距离, 起点为start_pos end_pos为起点加上距离
        line = new Line(start_pos, end_pos);
    }

    return {
        curve: line,
        length: fish_len,
    };
}
/** 计算鱼游入游出需要额外加的距离 */
export function calcNormalLen(position: OffsetPos, fish_type: string) {
    let fish_len: number;
    const offset = (getSpriteInfo('fish', fish_type) as FishSpriteInfo).offset;

    if (!offset) {
        console.error("can't find fish sprite offset"); // tslint:disable-line
    }
    if (position === 'before') {
        fish_len = offset[0];
    } else {
        fish_len = offset[2];
    }
    return fish_len;
}
/** 直立行走鱼的边缘路径直接垂直与边框就可以了 */
export function calcFixLen(start_pos: Point, fish_type: string) {
    const sprite_info = getSpriteInfo('fish', fish_type) as FishSpriteInfo;

    let fish_len: number;
    let derivative: SAT.Vector;
    if (start_pos.y <= 0) {
        /** 上 */
        fish_len = Math.max(sprite_info.offset[0], sprite_info.offset[2]);
        derivative = new SAT.Vector(0, -1);
    } else if (start_pos.x >= stage_width) {
        /* 右 */
        fish_len = Math.max(sprite_info.offset[1], sprite_info.offset[3]);
        derivative = new SAT.Vector(1, 0);
    } else if (start_pos.y >= stage_height) {
        /** 下 */
        fish_len = Math.max(sprite_info.offset[0], sprite_info.offset[2]);
        derivative = new SAT.Vector(0, 1);
    } else {
        /** 左 */
        fish_len = Math.max(sprite_info.offset[1], sprite_info.offset[3]);
        derivative = new SAT.Vector(-1, 0);
    }

    return {
        fish_len,
        derivative,
    };
}

export function createCurvesByPath(path_arr: number[][], fish_type: string) {
    const curves = [] as CurveInfo[];

    let all_length = 0;
    for (let i = 0; i < path_arr.length; i++) {
        let curve_info: CurveInfo;
        let curve: Curve;
        const path_item_info = path_arr[i] as [number, number, number, number];
        if (path_item_info.length >= 6) {
            // 贝塞尔曲线
            curve_info = createBezier(path_item_info);
            curve = curve_info.curve;
        } else if (path_item_info.length === 4) {
            // 直线
            curve_info = createLine(path_item_info);
            curve = curve_info.curve;
        } else {
            // zutil.log(`path is niether a bezier or line, I can't make it`);
            continue;
        }

        curves.push(curve_info);
        // 在曲线的前面添加一个直线, 用于鱼游入
        if (i === 0) {
            const curve_before = createSpace(
                'before',
                curve.get(0),
                curve.derivative(0),
                fish_type,
            ) as CurveInfo;
            curves.unshift(curve_before);
            all_length += curve_before.length;
        }
        // 在曲线的后面添加一个直线, 用于鱼游出
        if (i === path_arr.length - 1) {
            const curve_after = createSpace(
                'after',
                curve.get(1),
                curve.derivative(1),
                fish_type,
            ) as CurveInfo;
            curves.push(curve_after);
            all_length += curve_after.length;
        }
        all_length += curve_info.length;
    }

    let cur_length = 0;
    for (const curve of curves) {
        cur_length += curve.length;
        curve.radio = cur_length / all_length;
    }

    return curves;
}

export type DisplaceFunInfo = {
    funNo?: string;
    params?: any[];
    radio?: number;
    len?: number;
    /** poker水母直接出现在屏幕中间无需添加额外曲线 */
    no_enter_leave?: boolean;
    /** poseidon椭圆进入页面需要额外添加直线 */
    enter?: boolean;
    /** poseidon椭圆离开页面需要额外添加直线 */
    leave?: boolean;
};

export function createCurvesByFun(
    fun_list: DisplaceFunInfo[],
    fish_type: string,
    origin_len: number,
) {
    let all_length = 0;
    const curves = [] as CurveInfo[];
    for (let i = 0; i < fun_list.length; i++) {
        const curve_item = {} as CurveInfo;
        const {
            funNo: fun_no,
            params: fun_param,
            no_enter_leave,
            no_enter_leave: leave,
            radio,
        } = fun_list[i];
        /** 直接显示在页面中的鱼不需要添加额外路线 */
        let curve = FUNCTION[fun_no].apply(this, fun_param);
        curve_item.curve = curve;
        let length = origin_len * radio;
        if (!length && typeof curve.length === 'function') {
            length = curve.length(1);
        }
        curve_item.length = length || 1;
        all_length += curve_item.length;
        curves.push(curve_item);

        // 在曲线的前面添加一个直线, 用于鱼游入
        if (i === 0) {
            /** poker赛鱼直接在屏幕中间显示 不需要额外创建边界用于进入直线 */
            if (!no_enter_leave) {
                const curve_before = createSpace(
                    'before',
                    curve.get(0),
                    curve.derivative(0),
                    fish_type,
                ) as CurveInfo;
                curves.unshift(curve_before);
                all_length += curve_before.length;
            }
        }
        if (i === fun_list.length - 1) {
            /** 添加额外的离开曲线 */
            if (leave) {
                const offset_curve_info = createOffsetLine(curve_item, 'after');
                curves.push(offset_curve_info);
                all_length += offset_curve_info.length;
                curve = offset_curve_info.curve;
            }
            /** 离开屏幕为鱼大小添加新的路径  */
            const curve_after = createSpace(
                'after',
                curve.get(1),
                curve.derivative(1),
                fish_type,
            ) as CurveInfo;
            curves.push(curve_after);
            all_length += curve_after.length;
        }
    }

    let cur_length = 0;
    for (const curve of curves) {
        cur_length += curve.length;
        curve.radio = cur_length / all_length;
    }

    return curves;
}
/** 创建额外的 进入路线 离开路线 */
export function createOffsetLine(curve_info: CurveInfo, type: OffsetPos) {
    let p_radio = 0;
    if (type === 'after') {
        p_radio = 1;
    }
    /* 开始点坐标 -- 原曲线结束坐标*/
    const start_p = curve_info.curve.get(p_radio);
    /* 结束点方向 -- 原曲线结束方向*/
    const derivative_p = curve_info.curve.derivative(p_radio);
    let derivative = new SAT.Vector(derivative_p.x, derivative_p.y);
    if (type === 'before') {
        derivative = derivative.reverse();
    }
    const end_p = getLineOutPoint(start_p, derivative);

    let leave_line = new Line(end_p, start_p);
    if (type === 'after') {
        leave_line = new Line(start_p, end_p);
    }
    return {
        curve: leave_line,
        length: leave_line.length(1),
    };
}

export function createBezier(path_info: number[]) {
    const curve = new Bezier(path_info);
    return {
        curve,
        length: curve.length(),
    };
}

export function createLine(path_info: [number, number, number, number]) {
    // 直线
    const start_pos = {
        x: path_info[0],
        y: path_info[1],
    };
    const end_pos = {
        x: path_info[2],
        y: path_info[3],
    };
    const curve = new Line(start_pos, end_pos);
    return {
        curve,
        length: curve.length(1),
    };
}

/** 生成鱼的路径函数... */
export function createFishDisplace(data: ServerFishInfo) {
    const {
        fishId,
        displaceType,
        pathNo,
        pathList,
        usedTime,
        totalTime,
        reverse,
        funList,
        displaceLen,
    } = data;

    let curve_list: CurveInfo[];
    switch (displaceType) {
        case 'path':
            let path_arr: number[][];
            if (pathNo) {
                path_arr = PATH[pathNo];
            } else if (pathList) {
                path_arr = pathList;
            }
            if (!path_arr) {
                console.error(`cant find path for no:${pathNo}`);
                return;
            }
            curve_list = createCurvesByPath(path_arr, fishId);
            break;
        default:
            curve_list = createCurvesByFun(funList, fishId, displaceLen);
            break;
    }
    return new Displace(totalTime / 1000, usedTime / 1000, curve_list, reverse);
}
