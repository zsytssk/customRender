import { setProps, callFunc } from 'utils/utils';
import { clearCount, startCount } from 'utils/count';
import { PlayerModel } from 'model/game/playerModel';
import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';

/** 技能的状态 */
export enum SkillStatus {
    /** 正常状态 */
    Normal = 'normal',
    /** 激活前 防止多次激活 */
    PreActive = 'pre_active',
    /** 激活状态 */
    Disable = 'disable',
    /** 激活状态 */
    Active = 'active',
}

export type ActiveStepFun = (status: SkillStatus) => void;
/** 技能属性 */
export type SkillInfo = {
    item_id?: string;
    /** 技能的状态, 多个状态 用来处理需要多步处理的技能...
     * status = 0 1 2.. 禁用状态...
     */
    status?: SkillStatus;
    num?: number;
    cool_time?: number;
    used_time?: number;
    player?: PlayerModel;
};

/** 技能属性 */
export type SkillActiveInfo = {
    num?: number;
    used_time?: number;
    duration?: number;
};

/** 技能的事件 */
export const SkillEvent = {
    UpdateInfo: 'update_info',
    StatusChange: 'status_change',
    UpdateRadio: 'update_radio',
    ActiveSkill: 'active_skill',
    DisableSkill: 'disable_skill',
    Destroy: 'destroy',
};
export class SkillCoreCom extends ComponentManager {
    /** 技能对应的id */
    public item_id: string;
    /** 数目 */
    public num: number;
    /** 冷却时间 */
    public cool_time: number = 0;
    /** 冷却已经使用的时间 */
    public used_time: number = 0;
    /** 冷却 count index */
    public count_index: number;
    /** 技能的状态 */
    public status = SkillStatus.Normal;
    /** 所属的用户... */
    public player: PlayerModel;
    public event: EventCom;
    constructor(skill_info: SkillInfo) {
        super();
        setProps(this as SkillCoreCom, { ...skill_info });
        this.initCom();
    }
    private initCom() {
        const event = new EventCom();
        this.addCom(event);
        this.event = event;
    }
    public init() {
        const { used_time, num } = this;
        if (used_time) {
            this.active({
                used_time,
                num,
            });
            setProps(this as SkillCoreCom, { used_time: 0 });
        }
        this.event.emit(SkillEvent.UpdateInfo);
    }
    /** 更新数量 */
    public setNum(num: number) {
        this.num = num;
        this.event.emit(SkillEvent.UpdateInfo);
    }
    /** 设置技能的状态 */
    public setStatus(status: SkillStatus) {
        if (this.status === status) {
            return;
        }
        this.status = status;
        this.event.emit(SkillEvent.StatusChange, status);
    }
    public activeEvent(info: any) {
        this.event.emit(SkillEvent.ActiveSkill, info);
    }
    public active(info?: SkillActiveInfo, step_fn?: ActiveStepFun) {
        /** 只能激活一次 */
        if (this.status === SkillStatus.Active) {
            return false;
        }
        const { cool_time, event } = this;
        const { used_time, num } = info;

        const duration = info.duration || used_time;
        /** 倒计时的时间间隔 */
        const count_delta = 0.05;
        const cool_remain_time = cool_time - used_time;
        let duration_remain_time = duration - used_time;

        /**
         * 如果 duration === cool_time, 有时候 duration > cool_time;
         * 这会导致disable无法执行
         */
        if (duration_remain_time > cool_remain_time) {
            duration_remain_time = cool_remain_time;
        }

        this.setNum(num);
        this.setStatus(SkillStatus.Active);
        this.count_index = startCount(
            cool_remain_time,
            count_delta,
            (rate: number) => {
                const cool_used_time = (1 - rate) * cool_remain_time;
                const cool_radio = rate * (cool_remain_time / cool_time);
                event.emit(SkillEvent.UpdateRadio, cool_radio);
                if (
                    cool_used_time >= duration_remain_time &&
                    this.status !== SkillStatus.Disable
                ) {
                    this.disable();
                    callFunc(step_fn, this.status);
                }
                if (cool_radio === 0) {
                    this.reset();
                    callFunc(step_fn, this.status);
                }
            },
        );
    }
    /** 重置 */
    public reset() {
        if (this.status === SkillStatus.Active) {
            return;
        }
        console.warn(`SkillCoreCom:>reset:>`);
        this.setStatus(SkillStatus.Normal);
        clearCount(this.count_index);
    }
    /** 禁用 */
    public disable() {
        this.setStatus(SkillStatus.Disable);
    }
    /** 清除 */
    public destroy() {
        this.event.emit(SkillEvent.Destroy);
        this.setStatus(SkillStatus.Normal);
        clearCount(this.count_index);
        super.destroy();
    }
}
