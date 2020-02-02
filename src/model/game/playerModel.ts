import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { SkillMap } from 'data/config';
import { ModelEvent } from 'model/modelEvent';
import { getGunInfo } from 'utils/dataUtil';
import { setProps } from 'utils/utils';
import { FishEvent, FishModel } from './fish/fishModel';
import { GameModel } from './gameModel';
import { GunModel } from './gun/gunModel';
import { SkillInfo } from './skill/skillCoreCom';
import { SkillCtorMap, SkillModel } from './skill/skillModel';

type SkillInfoMap = {
    [key: string]: SkillInfo;
};

export type CaptureGain = {
    win: number;
    drop: HitDrop[];
};
export type CaptureInfo = {
    pos: Point;
    data: CaptureGain;
    resolve: FuncVoid;
};
export type PlayerInfo = {
    need_emit: boolean;
    user_id: string;
    server_index: number;
    bullet_cost: number;
    bullet_num: number;
    gun_skin: string;
    nickname: string;
    avatar: string;
    is_cur_player: boolean;
    skills?: SkillInfoMap;
};
export const PlayerEvent = {
    CaptureFish: FishEvent.BeCapture,
    UpdateInfo: 'update_info',
    Destroy: ModelEvent.Destroy,
};

/** 玩家的数据类 */
export class PlayerModel extends ComponentManager {
    /** 应该发送命令给服务端 */
    public need_emit: boolean;
    /** 用户id */
    public user_id: string;
    /** 是否是当前用户 */
    public is_cur_player: boolean;
    /** 服务器的位置 */
    public server_index: number;
    /** 等级 */
    public bullet_cost: number;
    /** 金币数量 */
    public bullet_num: number;
    /** 用户名 */
    public nickname: string;
    /** 图像地址 */
    public avatar: string;
    /** 炮台 */
    public gun: GunModel;
    /** 技能列表 */
    public skill_map: Map<string, SkillModel> = new Map();
    /** 炮台 */
    public game: GameModel;
    constructor(player_info: PlayerInfo, game: GameModel) {
        super();
        this.game = game;
        this.addCom(new EventCom());
        this.createGun(player_info);
    }
    public get event() {
        return this.getCom(EventCom);
    }
    private createGun(player_info: PlayerInfo) {
        const { gun_skin, skills, server_index, ...other } = player_info;

        const { pos } = getGunInfo(server_index);
        const gun = new GunModel(pos, gun_skin, this);
        this.gun = gun;

        this.updateInfo({
            server_index,
            ...other,
        });

        this.initSkill(skills);
    }
    public init() {
        const { skill_map, gun } = this;
        gun.init();
        for (const [, skill] of skill_map) {
            skill.init();
        }
    }
    public updateInfo(info: Partial<PlayerInfo>) {
        const { bullet_cost } = info;
        setProps(this as PlayerModel, info);
        if (info.bullet_cost) {
            this.gun.setBulletCost(bullet_cost);
        }
        this.event.emit(PlayerEvent.UpdateInfo);
    }
    /** 初始化用户的技能 */
    private initSkill(skills: SkillInfoMap) {
        const { skill_map } = this;
        for (const key in SkillCtorMap) {
            if (!SkillCtorMap.hasOwnProperty(key)) {
                continue;
            }
            const ctor = SkillCtorMap[key];
            const data = skills[key] || {};
            const info = {
                player: this,
                ...data,
            };
            skill_map.set(key, new ctor(info));
        }
    }
    /** 激活技能 */
    public activeSkill(skill: SkillMap, data = {} as any) {
        const skill_model = this.skill_map.get(skill);
        skill_model.active(data);
    }
    /** 重置技能 */
    public resetSkill(skill: SkillMap) {
        const skill_model = this.skill_map.get(skill);
        skill_model.reset();
    }
    /** 更新技能的数目 */
    public addSkillNum(id: string, num: number) {
        const skill_model = this.skill_map.get(id);
        skill_model.skill_core.addNum(num);
    }
    public async captureFish(
        pos: Point,
        data: { win: number; drop: HitDrop[] },
    ) {
        /** 掉落的金币+item动画 */
        await new Promise((resolve, reject) => {
            this.event.emit(PlayerEvent.CaptureFish, {
                pos,
                data,
                resolve,
            } as CaptureInfo);
        });

        const { win, drop } = data;
        const { bullet_num } = this;
        this.updateInfo({
            bullet_num: bullet_num + win,
        });

        if (drop) {
            for (const item of drop) {
                this.addSkillNum(item.itemId, item.itemNum);
            }
        }
    }
    public destroy() {
        const { gun, skill_map, game } = this;

        for (const [, skill] of skill_map) {
            skill.destroy();
        }
        gun.destroy();
        game.removePlayer(this);
        this.event.emit(PlayerEvent.Destroy);

        this.skill_map.clear();
        this.gun = undefined;
        super.destroy();
    }
}
