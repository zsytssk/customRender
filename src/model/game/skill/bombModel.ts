import { ComponentManager } from 'comMan/component';
import { TimeoutCom } from 'comMan/timeoutCom';
import { getFishById } from 'model/modelState';
import { playerCaptureFish } from '../fish/fishModelUtils';
import { SkillActiveInfo, SkillCoreCom, SkillInfo } from './skillCoreCom';
import { SkillModel } from './skillModel';

export type BombInfo = {
    user_id: string;
    pos: Point;
    fish_list: UseBombFishInfo[];
    /** 炸弹鱼触发 */
    is_bomb_fish?: boolean;
} & SkillActiveInfo;

/** 炸弹技能: 提示用户选中屏幕的位置, 然后就发射炸弹 */
export class BombModel extends ComponentManager implements SkillModel {
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
    public reset() {
        this.skill_core.reset();
    }
    public init() {
        this.skill_core.init();
    }
    public active(info: BombInfo) {
        // 激活
        const { num, fish_list, pos, used_time, is_bomb_fish } = info;
        const { skill_core } = this;
        const { player } = skill_core;
        const { bullet_num } = player;
        for (const fish of fish_list) {
            const { eid: fish_id, win, drop } = fish;
            const fish_model = getFishById(fish_id);
            if (!fish_model) {
                player.updateInfo({ bullet_num: bullet_num + win });
                continue;
            }
            playerCaptureFish(player, fish_model, { win, drop });
        }
        skill_core.activeEvent(pos);

        /** 炸弹鱼不激活技能的信息 */
        if (!is_bomb_fish) {
            return;
        }
        skill_core.active({ num, used_time });
    }
    public disable() {
        const { skill_core } = this;
        skill_core.disable();
    }
}
