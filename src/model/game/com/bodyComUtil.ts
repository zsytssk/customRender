import * as SAT from 'sat';
import { SHAPE, shapeOriInfoItem } from 'data/shape';
import { ShapeInfo, BodyCom, Shape } from './bodyCom';

export type ShapeOriType = 'fish' | 'bullet' | 'net';

export function getShapes(type: ShapeOriType, level?: number): ShapeInfo[] {
    const result = [] as ShapeInfo[];

    let shape_info: shapeOriInfoItem;
    if (type === 'fish') {
        shape_info = SHAPE.fish[level];
        if (shape_info.as) {
            shape_info = SHAPE.fish[shape_info.as];
        }
    } else if (type === 'bullet') {
        shape_info = SHAPE.bullet;
    } else {
        shape_info = SHAPE.net;
    }

    const { shape_list } = shape_info;

    for (const shape_item of shape_list) {
        const result_item = {} as ShapeInfo;
        const pos = shape_item.position || { x: 0, y: 0 };

        result_item.pos = new SAT.Vector(pos.x, pos.y);
        if (shape_item.type === 'Circle') {
            // 圆
            result_item.shape = new SAT.Circle(
                new SAT.Vector(0, 0),
                shape_item.radius,
            );
        } else if (shape_item.type === 'Box') {
            // 是简单的矩形
            const shape_box = new SAT.Box(
                new SAT.Vector(0, 0),
                shape_item.width,
                shape_item.height,
            );
            result_item.shape = shape_box.toPolygon();

            /** 如果有shape_item.pivot, 那么形状的中心点就是此位置, 如果没有就是形状的中心点 */
            if (shape_item.pivot) {
                result_item.shape.translate(
                    -shape_item.pivot.x,
                    -shape_item.pivot.y,
                );
            } else {
                result_item.shape.translate(
                    -shape_item.width / 2,
                    -shape_item.height / 2,
                );
            }
        } else {
            // 多边形
            const points = [];
            const pivot = shape_item.pivot;
            for (let i = 0; i < shape_item.points.length; i += 2) {
                const point_x = shape_item.points[i];
                const point_y = shape_item.points[i + 1];
                points.push(new SAT.Vector(point_x, point_y));
            }
            result_item.shape = new SAT.Polygon(new SAT.Vector(0, 0), points);
            if (pivot) {
                result_item.shape.translate(-pivot.x, -pivot.y);
            }
        }
        result.push(result_item);
    }

    return result;
}

/** 复制多边形 */
export function cloneShapeInfos(shapes: ShapeInfo[]) {
    const result = [] as ShapeInfo[];
    for (const item of shapes) {
        const { pos, shape } = item;
        const new_shape = cloneShape(shape);
        result.push({
            pos: pos.clone(),
            shape: new_shape,
        });
    }
    return result;
}
/** 复制多边形 */
export function cloneShape<T extends Shape>(shape: T): T {
    if (shape instanceof SAT.Polygon) {
        const points: Point[] = shape.points;
        const new_vec_list: SAT.Vector[] = [];
        for (const p of points) {
            new_vec_list.push(new SAT.Vector(p.x, p.y));
        }
        return new SAT.Polygon(new_vec_list[0], new_vec_list) as T;
    } else if (shape instanceof SAT.Circle) {
        return new SAT.Circle(shape.pos.clone(), shape.r) as T;
    }
}

export function scaleXShapeInfos(shapes: ShapeInfo[]) {
    const result = [] as ShapeInfo[];
    for (const item of shapes) {
        const { pos, shape } = item;
        const new_pos = new SAT.Vector(-pos.x, pos.y);
        let new_shape: Shape;
        if (shape instanceof SAT.Circle) {
            new_shape = cloneShape(shape);
        } else {
            const new_vec_list: SAT.Vector[] = [];
            for (const p of shape.points) {
                new_vec_list.push(new SAT.Vector(-p.x, p.y));
            }
            new_shape = new SAT.Polygon(
                new_vec_list[0],
                new_vec_list.reverse(),
            );
        }

        result.push({
            pos: new_pos,
            shape: new_shape,
        });
    }
    return result;
}

/** 检测和其他的bodyCom是否碰撞 */
export function detectCollision(ori_body: BodyCom, detect_body: BodyCom) {
    const { shapes: my_shapes } = ori_body;
    const { shapes: other_shapes } = detect_body;
    for (const my_shape_info of my_shapes) {
        const { shape: my_shape } = my_shape_info;
        for (const other_shape_info of other_shapes) {
            const { shape: other_shape } = other_shape_info;
            const response = new SAT.Response();
            let is_collision: boolean = false;
            if (
                my_shape instanceof SAT.Polygon &&
                other_shape instanceof SAT.Polygon
            ) {
                is_collision = SAT.testPolygonPolygon(
                    my_shape,
                    other_shape,
                    response,
                );
            }
            if (
                my_shape instanceof SAT.Circle &&
                other_shape instanceof SAT.Polygon
            ) {
                is_collision = SAT.testCirclePolygon(
                    my_shape,
                    other_shape,
                    response,
                );
            }
            if (
                my_shape instanceof SAT.Polygon &&
                other_shape instanceof SAT.Circle
            ) {
                is_collision = SAT.testCirclePolygon(
                    other_shape,
                    my_shape,
                    response,
                );
            }
            if (
                my_shape instanceof SAT.Circle &&
                other_shape instanceof SAT.Circle
            ) {
                is_collision = SAT.testCircleCircle(
                    other_shape,
                    my_shape,
                    response,
                );
            }
            if (is_collision) {
                return true;
            }
        }
        return false;
    }
}
