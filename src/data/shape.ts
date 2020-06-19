/** 鱼网子弹的形状
 * shape 里面是形状+pivot
 */
export type shape_type = 'Box' | 'Circle' | 'Polygon';

type ShapeOriInfo = {
    /** 形状的类型 矩形 圆 多边形 */
    type?: shape_type;
    /** box的宽 */
    width?: number;
    /** box的高  */
    height?: number;
    /** 圆的半径 */
    radius?: number;
    /** 多边形的点  */
    points?: number[];
    /** 形状的中心点位置 -- 多边形 */
    pivot?: Point;
    /** 相对中心点位置 -- 圆 */
    position?: Point;
};

/** 形状的参数 */
export type shapeOriInfoItem = {
    as?: string;
    shape_list?: ShapeOriInfo[];
};
interface ShapeOriData {
    /** 子弹 */
    bullet: shapeOriInfoItem;
    /** 网 */
    net: shapeOriInfoItem;
    /** 鱼 */
    fish: {
        [key: string]: shapeOriInfoItem;
    };
}
/*单个形状的信息*/
export type t_shape_item = {
    /** 形状  */
    shape: SAT.Polygon | SAT.Circle;
    /** 形状在body中的位置 */
    position?: SAT.Vector;
    /** 形状的类型 */
    type: shape_type;
};
export type t_shapes = t_shape_item[];
/** 形状来源的类型 */
export type ShapeOriType = 'fish' | 'bullet' | 'net';

/** 鱼网子弹的sprite
 * img 里面是图片的地址+pivot
 * shape 里面是形状+pivot
 */
export let SHAPE: ShapeOriData = {
    bullet: {
        shape_list: [
            {
                type: 'Circle',
                radius: 20,
            },
        ],
    },
    net: {
        shape_list: [
            {
                type: 'Circle',
                radius: 67,
            },
        ],
    },
    fish: {
        '1': {
            shape_list: [
                {
                    type: 'Circle',
                    radius: 25,
                },
            ],
        },
        '2': {
            shape_list: [
                {
                    type: 'Box',
                    width: 30,
                    height: 80,
                    position: {
                        x: 0,
                        y: -15,
                    },
                },
            ],
        },
        '3': {
            shape_list: [
                {
                    type: 'Circle',
                    radius: 30,
                },
            ],
        },
        '4': {
            shape_list: [
                {
                    type: 'Circle',
                    radius: 45,
                },
            ],
        },
        '5': {
            shape_list: [
                {
                    type: 'Box',
                    width: 50,
                    height: 100,
                    position: {
                        x: 0,
                        y: -50,
                    },
                },
            ],
        },
        '6': {
            shape_list: [
                {
                    type: 'Circle',
                    radius: 25,
                },
            ],
        },
        '7': {
            shape_list: [
                {
                    type: 'Circle',
                    radius: 30,
                    position: {
                        x: -10,
                        y: 0,
                    },
                },
            ],
        },
        '8': {
            shape_list: [
                {
                    type: 'Box',
                    width: 40,
                    height: 80,
                    position: {
                        x: 0,
                        y: 0,
                    },
                },
                {
                    type: 'Box',
                    width: 100,
                    height: 40,
                    position: {
                        x: 0,
                        y: 0,
                    },
                },
            ],
        },
        '9': {
            shape_list: [
                {
                    type: 'Circle',
                    radius: 59,
                },
            ],
        },
        '10': {
            shape_list: [
                {
                    type: 'Box',
                    width: 40,
                    height: 100,
                },
                {
                    type: 'Circle',
                    radius: 20,
                    position: {
                        x: -50,
                        y: -40,
                    },
                },
                {
                    type: 'Circle',
                    radius: 20,
                    position: {
                        x: 55,
                        y: -45,
                    },
                },
            ],
        },
        '11': {
            shape_list: [
                {
                    type: 'Box',
                    width: 60,
                    height: 50,
                    position: {
                        x: 0,
                        y: 30,
                    },
                },
                {
                    type: 'Circle',
                    radius: 40,
                    position: {
                        x: 0,
                        y: -35,
                    },
                },
            ],
        },
        '12': {
            shape_list: [
                {
                    type: 'Box',
                    width: 70,
                    height: 150,
                },
            ],
        },
        '13': {
            shape_list: [
                {
                    type: 'Box',
                    width: 70,
                    height: 250,
                    position: {
                        x: 0,
                        y: 25,
                    },
                },
                {
                    type: 'Box',
                    width: 90,
                    height: 30,
                    position: {
                        x: 0,
                        y: 190,
                    },
                },
            ],
        },
        '14': {
            shape_list: [
                {
                    type: 'Box',
                    width: 50,
                    height: 230,
                    position: {
                        x: 0,
                        y: 30,
                    },
                },
                {
                    type: 'Box',
                    width: 160,
                    height: 30,
                    position: {
                        x: 0,
                        y: -100,
                    },
                },
            ],
        },
        '15': {
            shape_list: [
                {
                    type: 'Box',
                    width: 150,
                    height: 350,
                    position: {
                        x: 0,
                        y: -10,
                    },
                },
                {
                    type: 'Box',
                    width: 50,
                    height: 90,
                    position: {
                        x: 0,
                        y: 215,
                    },
                },
                {
                    type: 'Box',
                    width: 150,
                    height: 50,
                    position: {
                        x: 0,
                        y: 290,
                    },
                },
            ],
        },
        '16': {
            shape_list: [
                {
                    type: 'Circle',
                    radius: 80,
                    position: {
                        x: 0,
                        y: 10,
                    },
                },
                // {
                //     type: 'Circle',
                //     radius: 30,
                //     position: {
                //         x: -90,
                //         y: -90,
                //     },
                // },
                // {
                //     type: 'Circle',
                //     radius: 35,
                //     position: {
                //         x: 90,
                //         y: -100,
                //     },
                // },
            ],
        },
        '17': {
            shape_list: [
                {
                    type: 'Circle',
                    radius: 70,
                },
            ],
        },
        '18': {
            shape_list: [
                {
                    type: 'Box',
                    width: 100,
                    height: 200,
                    position: {
                        x: 0,
                        y: -20,
                    },
                },
            ],
        },
        '19': {
            shape_list: [
                {
                    type: 'Box',
                    width: 90,
                    height: 210,
                },
            ],
        },
        '20': {
            shape_list: [
                {
                    type: 'Box',
                    width: 220,
                    height: 80,
                },
                // {
                //     type: 'Box',
                //     width: 20,
                //     height: 80,
                //     position: {
                //         x: -130,
                //         y: 0,
                //     },
                // },
            ],
        },
    },
};
