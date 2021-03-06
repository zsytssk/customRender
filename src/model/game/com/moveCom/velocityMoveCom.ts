import SAT from 'sat';
import { clearTick, createTick } from '../../../../utils/tick';
import { Config } from 'data/config';

/** 速度 移动控制 */
export class VelocityMoveCom implements MoveCom {
    private pos: Point;
    private velocity: SAT.Vector;
    private update_fn: MoveUpdateFn;
    private tick_index: number;
    /** 停止 */
    private is_stop = false;
    constructor(pos: Point, velocity: SAT.Vector) {
        this.pos = pos;
        this.velocity = velocity;
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
    public update(t: number) {
        const { pos, velocity, is_stop } = this;
        if (is_stop) {
            return;
        }

        pos.x += velocity.x * t;
        pos.y += velocity.y * t;
        this.detectHitWall();
        this.update_fn({ pos, velocity });
    }
    /** 绑定更新 */
    public onUpdate(update_fn: MoveUpdateFn) {
        this.update_fn = update_fn;
    }
    public detectHitWall() {
        const {
            PoolHeight: pool_height,
            PoolWidth: pool_width,
            BulletZoneWidth: zone_width,
        } = Config;

        const velocity = this.velocity;
        const pos = this.pos;
        let { x, y } = velocity;

        const start = (pool_width - zone_width) / 2;
        const end = start + zone_width;
        // 如果 碰到改变子弹的区域 方向 改变方向
        // x 方向
        if (pos.x > end) {
            pos.x = end - (pos.x - end);
            x = -Math.abs(velocity.x);
        }
        if (pos.x < start) {
            pos.x = start + (start - pos.x);
            x = Math.abs(velocity.x);
        }
        // y 方向
        if (pos.y > pool_height) {
            pos.y = pool_height - (pos.y - pool_height);
            y = -Math.abs(velocity.y);
        }
        if (pos.y < 0) {
            pos.y = -pos.y;
            y = Math.abs(velocity.y);
        }
        this.velocity = new SAT.Vector(x, y);
        this.pos = pos;
    }
    public destroy() {
        clearTick(this.tick_index);
        this.tick_index = 0;
        this.velocity = undefined;
        this.update_fn = undefined;
        this.is_stop = false;
    }
}
