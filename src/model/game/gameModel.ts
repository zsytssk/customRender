import { GameFreezeCom } from './com/gameFreezeCom';
import { ShoalCom } from './com/shoalCom';
import { FishModel } from './fish/fishModel';
import { PlayerInfo, PlayerModel } from './playerModel';
import { ComponentManager } from 'comMan/component';
import { TimeoutCom } from 'comMan/timeoutCom';
import { EventCom } from 'comMan/eventCom';
import { SkillMap } from 'data/config';
import {
    createFish,
    createFishGroup,
    playerCaptureFish,
} from './fish/fishModelUtils';
import { ModelEvent } from 'model/modelEvent';
import { window } from 'rxjs/operators';

export const GameEvent = {
    /** 添加鱼 */
    AddFish: 'add_fish',
    /** 添加用户 */
    AddPlayer: 'add_player',
    /** 冰冻 */
    Freezing: 'freezing',
    Destroy: ModelEvent.Destroy,
};

export class GameModel extends ComponentManager {
    public fish_list: Set<FishModel> = new Set();
    private player_list: Set<PlayerModel> = new Set();
    constructor() {
        super();
        this.initCom();
    }
    private initCom() {
        this.addCom(new EventCom(), new TimeoutCom());
    }
    public get event() {
        return this.getCom(EventCom);
    }
    /** 冰冻的处理  */
    public get freezing_com() {
        let freezing_com = this.getCom(GameFreezeCom);
        if (!freezing_com) {
            freezing_com = new GameFreezeCom(this);
            this.addCom(freezing_com);
        }
        return freezing_com;
    }
    public addFish(fish_info: ServerFishInfo) {
        const { group } = fish_info;
        if (!group) {
            /** 创建单个鱼 */
            const fish = createFish(fish_info, this);
            if (!fish) {
                return;
            }
            this.fish_list.add(fish);
            this.event.emit(GameEvent.AddFish, fish);
            fish.init();
            return fish;
        } else {
            /** 创建鱼组 */
            const fish_list = createFishGroup(fish_info, this);
            for (const fish of fish_list) {
                this.fish_list.add(fish);
                this.event.emit(GameEvent.AddFish, fish);
                fish.init();
            }

            return fish_list;
        }
    }
    public removeFish(fish: FishModel) {
        this.fish_list.delete(fish);
    }
    public getFishById(id: string) {
        const { fish_list } = this;
        for (const fish of fish_list) {
            if (fish.id === id) {
                return fish;
            }
        }
    }
    public getAllFish() {
        const { fish_list } = this;
        return [...fish_list];
    }
    public captureFish(info: HitRep) {
        const { userId, eid, backAmount } = info;
        const player = this.getPlayerById(userId);
        const fish = this.getFishById(eid);

        if (!player) {
            console.error(`Game:>captureFish:> cant find player for ${userId}`);
            return;
        }
        if (backAmount) {
            player.updateInfo({
                bullet_num: player.bullet_num + backAmount,
            });
        }

        if (!fish) {
            console.error(`Game:>captureFish:> cant find fish for ${eid}`);
            return;
        }
        playerCaptureFish(player, fish, info);
    }
    /** 鱼群的处理逻辑 */
    public get shoal_com() {
        let shoal_com = this.getCom(ShoalCom);
        if (!shoal_com) {
            shoal_com = new ShoalCom(this);
            this.addCom(shoal_com);
        }
        return shoal_com;
    }
    /** 添加用户 */
    public addPlayer(data: PlayerInfo) {
        const player = new PlayerModel(data, this);
        this.player_list.add(player);
        this.event.emit(GameEvent.AddPlayer, player);
        player.init();
        return player;
    }
    public getCurPlayer() {
        const { player_list } = this;
        for (const player of player_list) {
            if (player.is_cur_player) {
                return player;
            }
        }
    }
    public getPlayers() {
        return this.player_list;
    }
    public getPlayerById(id: string) {
        const { player_list } = this;
        for (const player of player_list) {
            if (player.user_id === id) {
                return player;
            }
        }
    }
    /** 移除用户 */
    public removePlayer(player: PlayerModel) {
        this.player_list.delete(player);
    }
    public activeSkill(skill: SkillMap, data: { user_id: string }) {
        const player = this.getPlayerById(data.user_id);
        if (!player) {
            console.error(
                `Game:>activeSkill:> cant find player:>${data.user_id}`,
            );
            return;
        }
        player.activeSkill(skill, data);
    }
    public disableSkill(skill: SkillMap, user_id: string) {
        const player = this.getPlayerById(user_id);
        if (!player) {
            console.error(`Game:>resetSkill:> cant find player:>${user_id}`);
            return;
        }
        player.disableSkill(skill);
    }
    public resetSkill(skill: SkillMap, user_id: string) {
        const player = this.getPlayerById(user_id);
        if (!player) {
            console.error(`Game:>resetSkill:> cant find player:>${user_id}`);
            return;
        }
        player.resetSkill(skill);
    }
    public shoot(data: ShootRep) {
        const player = this.getPlayerById(data.userId);
        if (!player) {
            console.error(
                `Game:>resetSkill:> cant find player:>${data.userId}`,
            );
            return;
        }
        player.gun.addBullet(data.direction, !player.is_cur_player);
    }
    public shoalComingTip(reverse: boolean) {
        this.shoal_com.preAddShoal(reverse);
    }
    public clear() {
        const { fish_list, player_list } = this;
        for (const player of player_list) {
            player.destroy();
        }
        for (const fish of fish_list) {
            fish.destroy();
        }
        this.fish_list.clear();
        this.player_list.clear();
    }
    public destroy() {
        this.event.emit(GameEvent.Destroy);
        this.clear();
        super.destroy();
    }
}
