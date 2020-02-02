import * as SAT from 'sat';
import { scaleXShapeInfos } from './bodyComUtil';

export type Shape = SAT.Polygon | SAT.Circle;
export type ShapeInfo = {
    /** 形状 */
    shape: Shape;
    /** 每一个形状相对 原点的位置 */
    pos: SAT.Vector;
};

export class BodyCom {
    /** 角度 */
    private angle: number = 0;
    /** 角度 */
    private pos: Point = { x: 0, y: 0 };
    /** 是否水平翻转 */
    public horizon_turn: boolean;
    /** 形状信息 */
    public shapes: ShapeInfo[];
    constructor(shapes: ShapeInfo[], horizon_turn = false) {
        this.shapes = shapes;
        this.horizon_turn = horizon_turn;
    }
    public update(pos: Point, direction?: SAT.Vector) {
        if (direction) {
            this.setAngle(direction);
        }
        this.setPos(pos);
    }
    /** 设置 body 的方向 */
    private setPos(pos: Point) {
        const { x, y } = pos;
        const { x: tx, y: ty } = this.pos;
        if (x === tx && y === ty) {
            return;
        }

        const { shapes } = this;
        for (const shape_info of shapes) {
            const { shape, pos: rel_pos } = shape_info;
            const { angle } = this;
            if (this.horizon_turn) {
                /** 方向改变 翻转形状 */
                const { x: nx, y: ny } = rel_pos;
                shape.pos = new SAT.Vector(x + nx, y + ny);
            } else {
                const { x: nx, y: ny } = rel_pos.clone().rotate(angle);
                shape.pos = new SAT.Vector(x + nx, y + ny);
            }
        }

        this.pos = { x, y };
    }
    /** 设置 body 的方向 */
    private setAngle(direction: SAT.Vector) {
        let angle = Math.atan2(direction.y, direction.x);
        const shapes = this.shapes;

        angle = angle + Math.PI / 2;
        if (this.horizon_turn) {
            /** 方向改变 翻转形状 */
            if (this.angle * angle < 0) {
                this.shapes = scaleXShapeInfos(this.shapes);
            }
        } else {
            for (const item of shapes) {
                const { shape } = item;
                if (!(shape instanceof SAT.Polygon)) {
                    continue;
                }
                shape.setAngle(angle);
            }
        }

        this.angle = angle;
    }
    public destroy() {
        this.shapes = undefined;
        this.angle = 0;
        this.pos = { x: 0, y: 0 };
    }
}
