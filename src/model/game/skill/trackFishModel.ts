import SAT from 'sat';
import { getFishById, getAimFish } from 'model/modelState';
import { SkillCoreCom, SkillInfo, SkillActiveInfo } from './skillCoreCom';
import { SkillModel } from './skillModel';
import { ComponentManager } from 'comMan/component';
import { TimeoutCom } from 'comMan/timeoutCom';
import { BulletGroup, BulletGroupEvent } from '../gun/bulletGroup';
import { GunModel, GunStatus, GunEvent, AddBulletInfo } from '../gun/gunModel';
import { FishEvent, FishModel } from 'model/game/fish/fishModel';

export type TrackFishActiveInfo = {
    user_id?: string;
    fish: string;
    /** 是否是提示 */
    is_tip?: boolean;
} & SkillActiveInfo;

export interface TrackFishInitInfo extends SkillInfo {
    lock_fish: string;
    lock_left: number;
}

export type StartTrackInfo = {
    fish: FishModel;
    fire: boolean;
};
export const GunTrackFishEvent = {
    /** 开始追踪 */
    StartTrack: 'start_track',
    /** 停止追踪 */
    StopTrack: 'stop_track',
};

export type TrackActiveData = {
    is_tip?: boolean;
    fish: FishModel;
    gun_pos: Point;
};

/** 冰冻技能 */
export class TrackFishModel extends ComponentManager implements SkillModel {
    public skill_core: SkillCoreCom;
    private timeout: TimeoutCom;
    private init_info: TrackFishInitInfo;
    public fish: FishModel;
    public bullet_list: Set<BulletGroup> = new Set();
    private gun: GunModel;
    constructor(info: TrackFishInitInfo) {
        super();
        this.initCom(info);
    }
    public init() {
        const { timeout, skill_core } = this;
        const { lock_fish, lock_left } = this.init_info;
        skill_core.init();
        if (lock_fish) {
            timeout.createTimeout(() => {
                this.active({ fish: lock_fish, used_time: lock_left });
            });
        }
        this.gun = this.skill_core.player.gun;
    }
    public reset() {
        this.skill_core.reset();
    }
    private initCom(info: TrackFishInitInfo) {
        const skill_core = new SkillCoreCom(info);
        const timeout = new TimeoutCom();
        this.addCom(skill_core, timeout);
        this.skill_core = skill_core;
        this.timeout = timeout;
        this.init_info = info;
    }
    public active(info: TrackFishActiveInfo) {
        // 激活
        const { skill_core } = this;
        const { fish, is_tip } = info;

        skill_core.active(info).then((is_complete: boolean) => {
            if (is_complete) {
                this.unTrack();
            }
        });
        if (is_tip) {
            return this.tipTrack();
        }
        const fish_model = getFishById(fish);
        if (!fish_model) {
            return console.error(`cant find fish for eid=${fish}`);
        }
        this.track(fish_model);
    }
    public tipTrack() {
        const { gun, skill_core } = this;
        const fish = getAimFish();
        console.log('test:>tipTrack', fish, fish.destroyed);
        skill_core.activeEvent({
            fish,
            is_tip: true,
            gun_pos: gun.pos,
        } as TrackActiveData);
    }
    /**
     * 追踪的鱼
     * @param fish 追踪的鱼
     * @param is_tip 是否是提示
     */
    private track(fish: FishModel) {
        const { gun, skill_core } = this;
        this.unTrack();
        this.bindTrackFish(fish);
        skill_core.activeEvent({
            fish,
            is_tip: false,
            gun_pos: gun.pos,
        } as TrackActiveData);
    }
    /** 监听锁定鱼事件 */
    private bindTrackFish(fish: FishModel) {
        const { gun } = this;
        const { event: gun_event } = gun;
        const { event: fish_event } = fish;

        this.fish = fish;
        gun.track_fish = fish;
        this.onTrackMove();
        fish_event.on(FishEvent.Move, this.onTrackMove, this);
        fish_event.on(
            FishEvent.Destroy,
            () => {
                this.unTrack();
                setTimeout(() => {
                    this.tipTrack();
                });
            },
            this,
        );
        gun.setStatus(GunStatus.TrackFish);

        gun.preAddBullet(gun.direction, true);
        gun_event.on(
            GunEvent.SwitchOn,
            () => {
                gun.preAddBullet(gun.direction, true);
            },
            this,
        );
        /** 收集 track fish 的子弹 在鱼销毁的时候需要还原
         */
        gun_event.on(
            GunEvent.AddBullet,
            (info: AddBulletInfo) => {
                if (info.track) {
                    const { bullet_group } = info;
                    this.bullet_list.add(bullet_group);
                    /** 子弹销毁的时候需要冲列表中销毁... */
                    bullet_group.event.on(BulletGroupEvent.Destroy, () => {
                        this.bullet_list.delete(bullet_group);
                    });
                }
            },
            this,
        );
    }
    /** 监听track目标位置改变 */
    private onTrackMove = () => {
        const { gun, fish } = this;
        if (!fish.visible) {
            return;
        }
        const { x, y } = fish.pos;
        const { x: gx, y: gy } = gun.pos;
        gun.setDirection(new SAT.Vector(x - gx, y - gy));
    }; // tslint:disable-line: semicolon
    private unTrack = () => {
        const { fish, gun, bullet_list } = this;
        const { player } = gun;
        if (!fish) {
            return;
        }
        let bullets_cost = 0;
        for (const bullet of bullet_list) {
            const { bullet_cost } = bullet;
            bullets_cost += bullet_cost;
            gun.removeBullet(bullet);
            bullet.destroy();
        }
        player.updateInfo({
            bullet_num: player.bullet_num + bullets_cost,
        });
        bullet_list.clear();

        gun.event.emit(GunTrackFishEvent.StopTrack);
        gun.setStatus(GunStatus.Normal);
        gun.track_fish = undefined;
        gun.event.offAllCaller(this);
        fish.event.offAllCaller(this);
        this.fish = null;
    }; // tslint:disable-line: semicolon
    public disable() {
        const { skill_core } = this;
        skill_core.disable();
    }
}
