import { Component, ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { Config } from 'data/config';
import { BodyCom } from '../com/bodyCom';
import { getShapes } from '../com/bodyComUtil';
import { LockMoveCom, LockTarget } from '../com/moveCom/lockMoveCom';
import { VelocityMoveCom } from '../com/moveCom/velocityMoveCom';
import { FishModel } from '../fish/fishModel';
import { ModelEvent } from '../../modelEvent';
import { getCollisionFish } from '../../modelState';
import { NetModel } from './netModel';
import { setProps } from 'utils/utils';
import { TimeoutCom } from 'comMan/timeoutCom';

export const BulletEvent = {
    Move: 'move',
    AddNet: 'add_net',
};
export type CastFn = (fish: FishModel) => void;
export type BulletInfo = {
    pos: Point;
    velocity: SAT.Vector;
    bullet_cost: number;
    skin_level: string;
    skin: string;
    lock?: LockTarget;
    cast_fn?: CastFn;
};
/** 子弹数据类 */
export class BulletModel extends ComponentManager {
    /** 等级 */
    public skin_level: string;
    /** 等级 */
    public bullet_cost: number;
    /** 等级 */
    public skin: string;
    /** 位置 */
    public pos: Point;
    /** 速度 */
    public velocity: SAT.Vector;
    public cast_fn: CastFn;
    public lock: LockTarget;
    public event: EventCom;
    private body: BodyCom;
    private move_com: MoveCom;
    constructor(props: BulletInfo) {
        super();

        setProps(this as BulletModel, {
            ...props,
            velocity: props.velocity.scale(Config.BulletSpeed),
        });
        this.initCom();
    }
    private initCom() {
        const { pos, velocity, lock } = this;
        const event = new EventCom();
        const com_list: Component[] = [event];

        let move_com: MoveCom;
        if (!lock) {
            const shapes = getShapes('bullet');
            const body_com = new BodyCom(shapes);
            move_com = new VelocityMoveCom(pos, velocity);
            com_list.push(move_com, body_com);
            move_com.onUpdate(this.onMoveChange);
            this.body = body_com;
        } else {
            move_com = new LockMoveCom(pos, velocity, lock, this.onHit);
            com_list.push(move_com);
            move_com.onUpdate(this.onLockMoveChange);
        }
        com_list.push(new TimeoutCom());
        this.move_com = move_com;
        this.event = event;
        this.addCom(...com_list);
    }
    public init() {
        const { move_com } = this;
        move_com.start();
    }
    private onMoveChange = (move_info: MoveInfo) => {
        const { pos, velocity } = move_info;
        const body_com = this.body;
        body_com.update(pos, velocity);

        this.pos = pos;
        this.velocity = velocity;
        this.event.emit(BulletEvent.Move, { pos, velocity } as MoveInfo);

        const fish = getCollisionFish(body_com);
        if (fish) {
            this.onHit(fish);
        }
    }; // tslint:disable-line
    /** 追踪鱼不需要进行碰撞检测, 不需要body */
    private onLockMoveChange = (move_info: MoveInfo) => {
        const { pos, velocity: direction } = move_info;

        this.pos = { ...move_info.pos };
        this.velocity = direction;
        this.event.emit(BulletEvent.Move, {
            pos,
            velocity: direction,
        } as MoveInfo);
    }; // tslint:disable-line
    private onHit = (fish: FishModel) => {
        const { cast_fn, move_com } = this;

        /** onHit 之后就无需updatePos,防止因为 setTimeout导致的时间差
         * 在destroy之后继续 cast_fn
         */
        move_com.destroy();
        this.delCom(move_com);
        this.move_com = undefined;

        /** 异步处理时为了, 让所有的子弹全部更新位置之后处理
         * 不然的话就会出现击中鱼时 子弹的位置存在很多的差别...
         */
        this.getCom(TimeoutCom).createTimeout(() => {
            cast_fn(fish);
        });
    }; // tslint:disable-line
    /** 创建鱼网... */
    public addNet = (show_cast: boolean) => {
        const { pos } = this;
        const net = new NetModel(
            {
                pos,
                show_cast,
            },
            this,
        );
        this.event.emit(BulletEvent.AddNet, net);
        this.destroy();
    }; // tslint:disable-line
    public destroy() {
        this.event.emit(ModelEvent.Destroy);

        this.cast_fn = undefined;
        this.event = undefined;
        this.body = undefined;
        super.destroy();
    }
}
