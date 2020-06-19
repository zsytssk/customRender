import * as SAT from 'sat';
import { clearTick, createTick } from 'utils/tick';

export interface LockTarget {
    pos: Point;
}
export type OnHit = (target: LockTarget) => void;

/** 锁定 移动控制 */
export class LockMoveCom implements MoveCom {
    private target: LockTarget;
    private pos: Point;
    /** 初始位置, 为了计算追踪子弹有没有击中目标 */
    private start_pos: Point;
    /** 速度 */
    private velocity_size: number;
    private update_fn: MoveUpdateFn;
    private on_hit: OnHit;
    private tick_index: number;
    /** 停止 */
    private is_stop = false;
    constructor(
        pos: Point,
        velocity: SAT.Vector,
        target: LockTarget,
        on_hit: OnHit,
    ) {
        this.target = target;
        this.pos = { ...pos };
        this.start_pos = { ...pos };
        this.velocity_size = velocity.len();
        this.on_hit = on_hit;
    }
    /** 显示当前位置 */
    public start() {
        if (this.tick_index) {
            this.is_stop = false;
            return;
        }
        this.is_stop = false;
        this.tick_index = createTick(this.update.bind(this));
        this.update(0);
    }
    public stop() {
        this.is_stop = true;
    }
    /** 绑定更新 */
    public onUpdate(update_fn: MoveUpdateFn) {
        this.update_fn = update_fn;
    }
    private update = (t: number) => {
        const { target, pos, is_stop, velocity_size } = this;
        if (is_stop) {
            return;
        }
        const { x, y } = pos;
        const { x: tx, y: ty } = target.pos;
        const velocity = new SAT.Vector(tx - x, ty - y)
            .normalize()
            .scale(velocity_size);

        pos.x += velocity.x * t;
        pos.y += velocity.y * t;

        if (this.detectOnHit()) {
            this.update_fn({ pos: { ...target.pos }, velocity });
            this.on_hit(target);
        } else {
            this.update_fn({ pos: { ...this.pos }, velocity });
        }
    }; //tslint:disable-line
    private detectOnHit() {
        const { pos, start_pos, target } = this;
        const { pos: lock_pos } = target;

        const vector_start = new SAT.Vector(
            lock_pos.x - start_pos.x,
            lock_pos.y - start_pos.y,
        ).normalize();
        const vector_now = new SAT.Vector(
            lock_pos.x - pos.x,
            lock_pos.y - pos.y,
        ).normalize();

        const dot_start_now = vector_now.dot(vector_start);

        if (dot_start_now > 0) {
            return false;
        }
        this.pos = lock_pos;
        return true;
    }
    public destroy() {
        clearTick(this.tick_index);
        this.tick_index = 0;
        this.target = undefined;
        this.on_hit = undefined;
        this.pos = undefined;
        this.start_pos = undefined;
        this.velocity_size = 0;
        this.update_fn = undefined;
        this.is_stop = false;
    }
}
