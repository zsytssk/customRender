import { setProps } from 'utils/utils';
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
    /** 激活状态1 */
    Active = 'active',
}
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
};

/** 技能的事件 */
export const SkillEvent = {
    UpdateInfo: 'update_info',
    StatusChange: 'status_change',
    UpdateRadio: 'update_radio',
    ActiveSkill: 'active_skill',
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
    /** count index */
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
    public addNum(num: number) {
        this.num += num;
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
    public active(info?: SkillActiveInfo) {
        return new Promise((resolve, reject) => {
            /** 只能激活一次 */
            if (this.status === SkillStatus.Active) {
                resolve(false);
                return;
            }
            const { cool_time, event } = this;
            const { used_time } = info;
            /** 倒计时的时间间隔 */
            const count_delta = 0.03;
            const remain_time = cool_time - used_time;

            this.setStatus(SkillStatus.Active);
            this.count_index = startCount(
                remain_time,
                count_delta,
                (rate: number) => {
                    const radio = rate * (remain_time / cool_time);
                    event.emit(SkillEvent.UpdateRadio, radio);
                    if (radio === 0) {
                        this.disable();
                        resolve(true);
                    }
                },
            );
        });
    }
    /** 重置 */
    public reset() {
        this.setStatus(SkillStatus.Normal);
        clearCount(this.count_index);
    }
    /** 禁用 */
    public disable() {
        this.setStatus(SkillStatus.Normal);
        clearCount(this.count_index);
    }
    /** 清除 */
    public destroy() {
        this.setStatus(SkillStatus.Normal);
        clearCount(this.count_index);
    }
}
