import { TrackTarget } from 'model/game/com/moveCom/moveTrackCom';
import { FishModel } from 'model/game/fish/fishModel';
import { BulletInfo, BulletModel } from './bulletModel';
import { GunModel } from './gunModel';
import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { ModelEvent } from 'model/modelEvent';

export type BulletGroupInfo = {
    bullets_pos: Point[];
    velocity: SAT.Vector;
    track?: TrackTarget;
};

export const BulletGroupEvent = {
    Destroy: ModelEvent.Destroy,
};

/** 子弹组合(一次发射多个子弹, 一颗子弹击中鱼, 所有同时生成网) */
export class BulletGroup extends ComponentManager {
    public bullet_list: Set<BulletModel> = new Set();
    private gun: GunModel;
    public bullet_cost: number;
    /** 是否已经捕捉到了, 只处理第一个bulletModel捕的鱼 */
    private casted = false;
    public event: EventCom;
    constructor(info: BulletGroupInfo, gun: GunModel) {
        super();
        this.bullet_cost = gun.bullet_cost;
        this.gun = gun;
        const event = new EventCom();
        this.event = event;
        this.addCom(event);
        this.initBullet(info);
    }
    public init() {
        const { bullet_list } = this;
        for (const bullet of bullet_list) {
            bullet.init();
        }
    }
    private initBullet(info: BulletGroupInfo) {
        const { bullets_pos, track, velocity } = info;
        const { skin, bullet_cost, skin_level } = this.gun;

        for (const pos of bullets_pos) {
            const bullet_props = {
                skin,
                pos,
                bullet_cost,
                track,
                skin_level,
                velocity: velocity.clone(),
                cast_fn: this.castFn,
            } as BulletInfo;
            const bullet = new BulletModel(bullet_props);
            this.bullet_list.add(bullet);
        }
    }
    /** 一颗子弹击中鱼之后的处理 */
    private castFn = (fish: FishModel) => {
        const { gun, casted, bullet_list, bullet_cost: bullet_price } = this;
        if (casted) {
            return;
        }
        const { is_cur_player } = gun.player;
        this.casted = true;
        if (is_cur_player) {
            gun.castFish(fish, bullet_price);
        }
        gun.removeBullet(this);
        this.gun = undefined;
        for (const bullet of bullet_list) {
            bullet.addNet(is_cur_player);
        }
        bullet_list.clear();
    }; //tslint:disable-line

    public destroy() {
        const { bullet_list } = this;
        for (const bullet of bullet_list) {
            bullet.destroy();
        }
        bullet_list.clear();
        this.event.emit(BulletGroupEvent.Destroy);

        this.event = undefined;
        this.gun = undefined;
        this.bullet_cost = 0;

        super.destroy();
    }
}
