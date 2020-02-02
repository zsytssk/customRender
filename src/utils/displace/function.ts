import { Curve } from './displace';
import { Line } from './line';

/**
 * 位移控制器 -- 方程
 */
type t_displace_fun_obj = {
    [key: string]: (...params: any[]) => Curve;
};
export let FUNCTION: t_displace_fun_obj = {
    /**
     * 正玄曲线 a - 振幅, b - 角频率, c-偏离y位移, d-x 偏移, e-间距
     * a*sin(b*x+d)+c
     */
    '1': (a: number, b: number, c: number, d: number, e: number[]) => {
        const space = e[1] - e[0];
        let dt = 1;
        if (space < 0) {
            dt = -1;
        }
        return {
            get(t: number) {
                t = e[0] + t * space;
                return {
                    x: t,
                    y: a * Math.sin(d + b * t) + c,
                };
            },
            derivative(t: number) {
                t = e[0] + t * space;
                return {
                    x: dt,
                    y: dt * a * b * Math.cos(d + b * t),
                };
            },
        };
    },
    /** 上下直线->圆 */
    '2': (o: Point, r: number, d: number[]) => {
        const circle_angle_len = d[1] - d[0];
        const direct = circle_angle_len > 0 ? 1 : -1;
        const circle_len = Math.abs(circle_angle_len) * r;
        const start_pos = { x: o.x - direct * r, y: 750 };
        const line1_len = 750 - o.y;
        const line2_len = o.y;
        const all_len = line1_len + circle_len + line2_len;
        /** 所有位置的比例, 用来计算t在什么位置 */
        const radio_arr = [
            0,
            line1_len / all_len,
            (line1_len + circle_len) / all_len,
            1,
        ];
        return {
            get(t: number) {
                /** 现在处于哪一段直线 */
                let index = 0;
                for (let i = 0; i < radio_arr.length; i++) {
                    if (t < radio_arr[i]) {
                        break;
                    }
                    index = i;
                }
                t =
                    (t - radio_arr[index]) /
                    (radio_arr[index + 1] - radio_arr[index]);
                if (index === 0) {
                    return {
                        x: start_pos.x,
                        y: 750 - t * line1_len,
                    };
                } else if (index === 1) {
                    t = t * circle_angle_len + d[0];
                    return {
                        x: o.x + Math.cos(t) * r,
                        y: o.y + Math.sin(t) * r,
                    };
                } else {
                    return {
                        x: start_pos.x,
                        y: line2_len * (1 - t),
                    };
                }
            },
            derivative(t: number) {
                /** 现在处于哪一段直线 */
                let index = 0;
                for (let i = 0; i < radio_arr.length; i++) {
                    if (t < radio_arr[i]) {
                        break;
                    }
                    index = i;
                }
                t =
                    (t - radio_arr[index]) /
                    (radio_arr[index + 1] - radio_arr[index]);
                if (index !== 1) {
                    return {
                        x: 0,
                        y: -1,
                    };
                } else {
                    t = t * circle_angle_len + d[0];
                    return {
                        x: direct * Math.cos(Math.PI / 2 + t),
                        y: direct * Math.sin(Math.PI / 2 + t),
                    };
                }
            },
        };
    },
    /** 直线方程 */
    '3': (so: Point, eo: Point) => {
        return new Line(so, eo);
    },
    /**
     * 椭圆 - poker赛水母的路径
     * @param offset_x 中心点x的偏移量
     * @param offset_y 中心点y的偏移量
     * @param duration 开始点和结束点
     */
    '4': (offset_x: number, offset_y: number, duration: number[]) => {
        const space = duration[1] - duration[0];
        const direction = space > 0 ? 1 : -1;
        const center_x = 1334 / 2 + offset_x;
        const center_y = 750 / 2 + offset_y;

        const a = 0.25 * 1334;
        const b = 0.25 * 750;
        return {
            get(t: number) {
                t = duration[0] + t * space;
                return {
                    x: a * Math.cos(t) + center_x,
                    y: b * Math.sin(t) + center_y,
                };
            },
            derivative(t: number) {
                t = duration[0] + t * space;
                return {
                    x: -direction * a * Math.sin(t),
                    y: direction * b * Math.cos(t),
                };
            },
            length(t: number) {
                /** 椭圆周长*当前跑几周--如果跑的不是整数圈 那么这是一个近似值 */
                return Math.abs(
                    Math.ceil(
                        (t * (2 * Math.PI * b + 4 * (a - b)) * space) /
                            (2 * Math.PI),
                    ),
                );
            },
        };
    },
};
