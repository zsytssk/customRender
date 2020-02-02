import * as SAT from 'sat';
import { timeToFrame } from './displaceUtil';
import { Line } from './line';

export type Curve = {
    get(t: number): Point;
    derivative(t: number): Point;
    length?(t?: number): number;
    is_static?: boolean;
};

export type CurveInfo = {
    curve: Curve;
    length: number;
    radio?: number;
    radio_len?: number;
};
/** 当前曲线信息 */
export type CurCurveInfo = {
    /** 当前 curve 在所有curve_list中的index */
    index: number;
    /** 当前 curve 在所有 curve_list 中的开始所在的 radio */
    start_radio: number;
    /** 当前 curve 在所有 curve_list 中的结束所在的 end_radio */
    end_radio: number;
    /** 当前curve */
    curve: CurveInfo;
    /** 当前radio在当前中curve中的radio */
    radio_in_curve: number;
};
export type DisplaceInfo = {
    /** 位置 */
    pos?: Point;
    /** 速度 */
    velocity?: SAT.Vector;
    /** 是否显示 */
    visible?: boolean;
    /** 是否游完路径 | 函数 */
    is_complete?: boolean;
};
/**
 * 位移控制器
 */
export class Displace {
    /** 所有的曲线信息 */
    protected curve_list: CurveInfo[] = [];
    /** 使用的时间-单位帧数 */
    protected used_frame: number;
    /** 总共的时间-单位帧数 */
    protected total_frame: number;
    /** 当前所在的曲线信息, 如果在同一分段曲线上就不用重复计算 cur_curve */
    protected cur_curve_info = {} as CurCurveInfo;
    /** 是否反转 */
    private is_reverse: boolean = false;
    /** 当前移动的比率 */
    public radio: number;
    /**
     * 获取鱼的路径
     * @param path_id 鱼的路径
     * @param total_time total_time 鱼总共游多长时间
     * @param used_time 鱼已经游了多长时间
     */
    constructor(
        total_time: number,
        used_time: number,
        curve_list: CurveInfo[],
        reverse?: boolean,
    ) {
        this.total_frame = timeToFrame(total_time);
        this.used_frame = timeToFrame(used_time);
        this.curve_list = curve_list;
        this.is_reverse = reverse;
    }
    /**
     * 更新path的时间, 通过这个计算现在的位置
     * @param update_frame 更新的帧数
     */
    public update(update_frame: number): DisplaceInfo {
        const { is_reverse } = this;
        const used_frame = (this.used_frame = this.used_frame + update_frame);
        let used_radio = used_frame / this.total_frame;
        let is_complete: boolean = false;
        this.radio = used_radio;
        if (used_radio <= 0) {
            return {
                visible: false,
            };
        }

        if (used_radio >= 1) {
            is_complete = true;
            return {
                is_complete,
            };
        }

        if (is_reverse) {
            used_radio = 1 - used_radio;
        }

        const point_info = this.getPointAtRadio(used_radio);
        const position = point_info.position;
        let velocity = point_info.direction;
        if (is_reverse) {
            velocity = velocity.reverse();
        }

        return {
            visible: true,
            pos: position,
            velocity,
            is_complete,
        };
    }
    protected getPointAtRadio(
        radio: number,
    ): { position: Point; direction: SAT.Vector } {
        const cur_curve_info = this.calcCurCurveInfo(radio);
        const {
            curve: cur_curve,
            radio_in_curve: cur_radio,
            index: cur_idx,
        } = cur_curve_info;

        const position = cur_curve.curve.get(cur_radio);
        let direction = cur_curve.curve.derivative(cur_radio);

        /** 如果此时为静止的那么他的方向为前一条路径终点的方向 */
        if ((cur_curve.curve as Line).is_static) {
            let other_fun;
            let other_radio;
            const curve_list = this.curve_list;
            /** prev fun */
            if (cur_idx - 1 >= 0) {
                other_fun = curve_list[cur_idx - 1].curve;
                other_radio = 1;
            } else {
                other_fun = curve_list[cur_idx + 1].curve;
                other_radio = 0;
            }
            direction = other_fun.derivative(other_radio);
        }
        return {
            position,
            direction: new SAT.Vector(direction.x, direction.y),
        };
    }
    /** 通过radio获取当前曲线信息 */
    protected calcCurCurveInfo(radio: number): CurCurveInfo {
        const { cur_curve_info, curve_list, is_reverse } = this;
        const { end_radio, start_radio } = cur_curve_info;
        let cur_radio = 0;

        /** 如果当前的radio变化还在一个曲线中 */
        if (
            (!is_reverse && end_radio && radio < end_radio) ||
            (is_reverse && start_radio && radio > start_radio)
        ) {
            cur_radio = (radio - start_radio) / (end_radio - start_radio);
            cur_curve_info.radio_in_curve = cur_radio;
            return cur_curve_info;
        }

        /** 如果进入下一个曲线 */
        let cur_idx = 0;
        let prev_radio: number;
        let curve: CurveInfo;

        for (let i = 0; i < curve_list.length; i++) {
            curve = curve_list[i];
            if (radio > curve.radio) {
                continue;
            }
            cur_idx = i;
            if (cur_idx === 0) {
                prev_radio = 0;
                cur_radio = radio / curve.radio;
            } else {
                prev_radio = curve_list[i - 1].radio;
                cur_radio = (radio - prev_radio) / (curve.radio - prev_radio);
            }
            break;
        }
        cur_curve_info.radio_in_curve = cur_radio;
        cur_curve_info.index = cur_idx;
        cur_curve_info.start_radio = prev_radio;
        cur_curve_info.end_radio = curve.radio;
        cur_curve_info.curve = curve;

        return cur_curve_info;
    }
}
