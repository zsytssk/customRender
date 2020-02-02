import { ComponentManager } from 'comMan/component';
import { GunEvent, GunModel, GunStatus } from 'model/game/gun/gunModel';

/** 自动攻击 */
export class GunAutoLaunchCom extends ComponentManager {
    private gun: GunModel;
    constructor(gun: GunModel) {
        super();
        this.gun = gun;
    }
    /** 自动发射 */
    public active() {
        const { gun } = this;
        const { event } = gun;
        event.on(
            GunEvent.SwitchOn,
            () => {
                gun.preAddBullet(gun.direction, true);
            },
            this,
        );
        gun.setStatus(GunStatus.AutoLaunch);
        gun.preAddBullet(gun.direction, true);
    }
    public clear() {
        const { gun } = this;
        const { event } = gun;
        gun.setStatus(GunStatus.Normal);
        event.offAllCaller(this);
    }
    public destroy() {
        this.clear();
        this.gun.delCom(this);
        this.gun = undefined;
    }
}
