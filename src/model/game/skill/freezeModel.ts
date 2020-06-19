import { modelState } from 'model/modelState';
import { SkillCoreCom, SkillInfo, SkillActiveInfo } from './skillCoreCom';
import { SkillModel } from './skillModel';
import { ComponentManager } from 'comMan/component';

export type FreezeInfo = {
    user_id: string;
    fish_list: string[];
    duration: number;
} & SkillActiveInfo;
/** 冰冻技能 */
export class FreezeModel extends ComponentManager implements SkillModel {
    public skill_core: SkillCoreCom;
    constructor(info: SkillInfo) {
        super();
        this.initCom(info);
    }
    private initCom(info: SkillInfo) {
        const skill_core = new SkillCoreCom(info);
        this.addCom(skill_core);
        this.skill_core = skill_core;
    }
    public init() {
        this.skill_core.init();
    }
    public reset() {
        this.skill_core.reset();
    }
    public active(info: FreezeInfo) {
        const { skill_core } = this;
        const { used_time, fish_list, duration } = info;
        const { game } = modelState.app;
        game.freezing_com.freezing(duration - used_time, fish_list);
        skill_core.active(info);
    }
    public disable() {
        const { skill_core } = this;
        skill_core.disable();
    }
}
