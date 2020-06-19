import { SkillCoreCom, SkillInfo, SkillStatus } from './skillCoreCom';
import { SkillModel } from './skillModel';
import { ComponentManager } from 'comMan/component';

export type AutoShootInfo = {
    user_id: string;
    autoShoot: boolean;
} & SkillInfo;

/** 炸弹技能: 提示用户选中屏幕的位置, 然后就发射炸弹 */
export class AutoShootModel extends ComponentManager implements SkillModel {
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
    public toggle() {
        const { status } = this.skill_core;
        if (status === SkillStatus.Normal) {
            this.active();
        } else {
            this.disable();
        }
    }
    public init() {
        this.skill_core.init();
    }
    public reset() {
        const { skill_core } = this;
        const { player } = skill_core;
        player.gun.autoShoot.clear();
        skill_core.reset();
    }
    public active() {
        // 激活
        const { skill_core } = this;
        const { player } = this.skill_core;
        player.gun.autoShoot.active();
        skill_core.active({
            used_time: 0,
        });
    }
    public disable() {
        const { skill_core } = this;
        skill_core.reset();
        this.reset();
    }
}
