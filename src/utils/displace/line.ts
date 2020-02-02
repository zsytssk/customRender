import * as SAT from 'sat';
/** 直线方程 */
export class Line {
    /** 方向 */
    private direction: SAT.Vector;
    /** 是否是静止 */
    public is_static: boolean = false;
    /** 长度 */
    private len: number;
    private start_pos: Point;
    private end_pos: Point;
    constructor(start_pos: Point, end_pos: Point) {
        if (start_pos.x === end_pos.x && start_pos.y === end_pos.y) {
            this.is_static = true;
            this.len = 0;
            this.direction = new SAT.Vector(0, 0);
        }

        const x1 = start_pos.x;
        const y1 = start_pos.y;
        const x2 = end_pos.x;
        const y2 = end_pos.y;
        const dy = y2 - y1;
        const dx = x2 - x1;
        const len = Math.sqrt(dx * dx + dy * dy);

        this.start_pos = start_pos;
        this.end_pos = end_pos;
        this.direction = new SAT.Vector(dx, dy).normalize();
        this.len = len;
    }
    public get(t: number) {
        const len = t * this.len;
        const direction = this.direction.clone().scale(len, len);
        const x = this.start_pos.x;
        const y = this.start_pos.y;

        return {
            x: x + direction.x,
            y: y + direction.y,
        };
    }
    public derivative(t: number) {
        return this.direction;
    }
    public length(t: number) {
        return this.len;
    }
}
