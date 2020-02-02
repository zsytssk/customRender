import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { TimeoutCom } from 'comMan/timeoutCom';
import { BodyCom } from '../com/bodyCom';
import { getShapes } from '../com/bodyComUtil';
import { ModelEvent } from '../../modelEvent';
import { BulletModel } from './bulletModel';
import { getCollisionAllFish } from 'model/modelState';

export type NetInfo = {
    show_cast: boolean;
    pos: Point;
};
export const NetEvent = {
    CastFish: 'cast_fish',
};
/** 鱼网数据类 */
export class NetModel extends ComponentManager {
    /** 位置 */
    public pos: Point;
    /** 炮等级 */
    public bullet_cost: number;
    /** 炮皮肤 */
    public skin: string;
    /** 炮皮肤 */
    public skin_level: string;
    /** 是否显示 cast fish 的状态  */
    public show_cast: boolean;
    public event: EventCom;
    constructor(info: NetInfo, bullet: BulletModel) {
        super();

        const { show_cast, pos } = info;
        this.bullet_cost = bullet.bullet_cost;
        this.skin = bullet.skin;
        this.skin_level = bullet.skin_level;
        this.show_cast = show_cast;
        this.pos = pos;
        this.init();
    }
    public get body() {
        return this.getCom(BodyCom);
    }
    private init() {
        const { show_cast } = this;
        const shapes = getShapes('net');
        const body_com = new BodyCom(shapes);
        body_com.update(this.pos);
        const timeout_com = new TimeoutCom();
        const event = new EventCom();
        this.addCom(event, timeout_com, body_com);
        this.event = event;

        if (show_cast) {
            /** 做成异步, 不然信息 netCtrl 无法接受到 */
            timeout_com.createTimeout(() => {
                const fish_list = getCollisionAllFish(body_com);
                for (const fish of fish_list) {
                    fish.beCast();
                }
                this.event.emit(NetEvent.CastFish, fish_list);
            }, 0);
        }

        timeout_com.createTimeout(() => {
            this.destroy();
        }, 100);
    }
    public destroy() {
        this.pos = undefined;
        this.bullet_cost = undefined;
        this.skin = undefined;
        this.skin_level = undefined;
        this.show_cast = false;
        this.event.emit(ModelEvent.Destroy);
        super.destroy();
    }
}
