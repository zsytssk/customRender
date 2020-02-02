/** 资源所属场景 */
type BelongScene = 'room_normal' | 'room_poker';
/** 鱼网子弹的sprite
 * img 里面是图片的地址+pivot
 * shape 里面是形状+pivot
 */

export type SpriteInfo = {
    as?: string;
    /** 动画类型龙骨动画 帧动画 直接图片 */
    type?: 'DragonBone' | 'Frame' | 'Img';
    /** 图片的地址 */
    path?: string;
    /** 图片的中心点 */
    pivot?: Point;
    /** 宽 */
    width?: number;
    /** 高 */
    height?: number;
    belong_scene?: BelongScene;
};

/** 鱼动画类型 正常 | 水平翻转 */
export type FishAniType = 'normal' | 'horizon_turn';
export type FishSpriteInfo = SpriteInfo & {
    /** 有没有转向动画 */
    ani_type?: FishAniType;
    group?: Array<{
        type: string;
        pos: Point;
    }>;
    /** 为了在边界给鱼添加额外的路径, 慢慢的进入|退出 */
    offset?: number[];
    turn_ani?: boolean;
};
export interface GameSprite {
    /** 枪 */
    gun: {
        [key: string]: string[];
    };
    /** 子弹 */
    bullet: {
        [key: string]: SpriteInfo;
    };
    /** 鱼icon */
    fish_icon: {
        [key: string]: SpriteInfo;
    };
    /** 网 */
    net: {
        [key: string]: SpriteInfo;
    };
    /** 鱼阴影 */
    fish_shadow: {
        [key: string]: SpriteInfo;
    };
    /** 鱼 */
    fish: {
        [key: string]: FishSpriteInfo;
    };
    /** 技能 */
    other: {
        [key: string]: SpriteInfo;
    };
}
/** 鱼网子弹的sprite
 * img 里面是图片的地址+pivot
 * shape 里面是形状+pivot
 */
export type SpriteType =
    | 'coin'
    | 'gun'
    | 'net'
    | 'bullet'
    | 'fish'
    | 'fish_shadow'
    | 'gun_fire'
    | 'skill'
    | 'other';

export let SPRITE: GameSprite = {
    gun: {
        '1': ['base', 'light', 'gun'],
        '2': ['light', 'gun'],
        '3': ['light', 'gun'],
        '4': ['light', 'gun'],
        '5': ['body', 'gun'],
    },
    bullet: {
        '1': {
            type: 'DragonBone',
            path: 'ani/gun/bullet1',
        },
        '2': {
            type: 'DragonBone',
            path: 'ani/gun/bullet2',
        },
        '3': {
            type: 'DragonBone',
            path: 'ani/gun/bullet3',
        },
        '4': {
            type: 'DragonBone',
            path: 'ani/gun/bullet4',
        },
        '5': {
            type: 'DragonBone',
            path: 'ani/gun/bullet5',
        },
    },
    net: {
        '1': {
            type: 'DragonBone',
            path: 'ani/gun/net1',
        },
        '2': { type: 'DragonBone', path: 'ani/gun/net2' },
        '3': { type: 'DragonBone', path: 'ani/gun/net3' },
        '4': { type: 'DragonBone', path: 'ani/gun/net4' },
        '5': { type: 'DragonBone', path: 'ani/gun/net5' },
    },
    fish_shadow: {
        '1': {
            type: 'Img',
            path: 'images/game/fish_shadow1',
        },
    },
    fish: {
        '1': {
            type: 'DragonBone',
            offset: [50, 41, 33, 43],
            path: 'ani/fish/fish1',
            ani_type: 'horizon_turn',
        },
        '2': {
            type: 'DragonBone',
            offset: [63, 50, 62, 50],
            path: 'ani/fish/fish2',
        },
        '3': {
            type: 'DragonBone',
            offset: [47, 67, 38, 58],
            path: 'ani/fish/fish3',
            ani_type: 'horizon_turn',
        },
        '4': {
            type: 'DragonBone',
            offset: [82, 90, 86, 91],
            path: 'ani/fish/fish4',
        },
        '5': {
            type: 'DragonBone',
            offset: [137, 43, 168, 43],
            path: 'ani/fish/fish5',
        },
        '6': {
            type: 'DragonBone',
            offset: [49, 47, 36, 44],
            path: 'ani/fish/fish6',
            ani_type: 'horizon_turn',
        },
        '7': {
            type: 'DragonBone',
            offset: [47, 56, 38, 55],
            path: 'ani/fish/fish7',
            ani_type: 'horizon_turn',
        },
        '8': {
            type: 'DragonBone',
            offset: [44, 79, 120, 80],
            path: 'ani/fish/fish8',
        },
        '9': {
            type: 'DragonBone',
            offset: [85, 93, 88, 86],
            path: 'ani/fish/fish9',
        },
        '10': {
            type: 'DragonBone',
            offset: [84, 91, 87, 88],
            path: 'ani/fish/fish10',
        },
        '11': {
            type: 'DragonBone',
            offset: [86, 72, 150, 68],
            path: 'ani/fish/fish11',
            ani_type: 'horizon_turn',
        },
        '12': {
            type: 'DragonBone',
            offset: [176, 74, 175, 75],
            path: 'ani/fish/fish12',
        },
        '13': {
            type: 'DragonBone',
            offset: [162, 103, 201, 102],
            path: 'ani/fish/fish13',
        },
        '14': {
            type: 'DragonBone',
            offset: [148, 99, 311, 99],
            path: 'ani/fish/fish14',
        },
        '15': {
            type: 'DragonBone',
            offset: [229, 157, 290, 156],
            path: 'ani/fish/fish15',
        },
        '16': {
            type: 'DragonBone',
            offset: [157, 130, 68, 131],
            path: 'ani/fish/fish16',
            ani_type: 'horizon_turn',
            turn_ani: true,
        },
        '17': {
            type: 'DragonBone',
            offset: [122, 92, 150, 92],
            path: 'ani/fish/fish17',
        },
        '18': {
            type: 'DragonBone',
            offset: [128, 106, 85, 123],
            path: 'ani/fish/fish18',
            ani_type: 'horizon_turn',
        },
        '19': {
            type: 'DragonBone',
            offset: [147, 140, 133, 156],
            path: 'ani/fish/fish19',
            ani_type: 'horizon_turn',
            turn_ani: true,
        },
        '20': {
            type: 'DragonBone',
            offset: [110, 183, 54, 138],
            path: 'ani/fish/fish20',
            ani_type: 'horizon_turn',
            turn_ani: true,
        },
        G1: {
            group: [
                { type: '2', pos: { x: 20.5, y: 49.5 } },
                { type: '2', pos: { x: 20, y: -51.5 } },
            ],
            offset: [101.5, 83.5, 98.5, 0],
        },
        G2: {
            group: [
                { type: '1', pos: { x: 3.5, y: 49 } },
                { type: '1', pos: { x: 3.5, y: -71 } },
                { type: '1', pos: { x: -76.5, y: -11 } },
            ],
            offset: [108.5, 47.5, 93.5, 0],
        },
        G3: {
            group: [
                { type: '6', pos: { x: 365, y: -15 } },
                { type: '6', pos: { x: 205, y: -15 } },
                { type: '6', pos: { x: 285, y: 55 } },
                { type: '6', pos: { x: 285, y: -75 } },
            ],
            offset: [118.5, 410.5, 98.5, 0],
        },
        G4: {
            group: [
                { type: '3', pos: { x: 88, y: 98.5 } },
                { type: '3', pos: { x: 77, y: -119.5 } },
                { type: '3', pos: { x: -85, y: 69.5 } },
                { type: '3', pos: { x: -85, y: -77.5 } },
                { type: '3', pos: { x: 15, y: -5.5 } },
            ],
            offset: [164.5, 154.5, 143.5, 0],
        },
    },
    fish_icon: {
        '1': {
            type: 'Img',
            path: 'images/game/normal/icon_fish1',
        },
        '2': {
            type: 'Img',
            path: 'images/game/normal/icon_fish2',
        },
    },
    other: {
        freezing: {
            type: 'DragonBone',
            path: 'ani/other/freezing',
        },
        exploding: {
            type: 'DragonBone',
            path: 'ani/other/exploding',
        },
        shoal_wave: {
            type: 'DragonBone',
            path: 'ani/other/shoal_wave',
        },
        pos_tip: {
            type: 'DragonBone',
            path: 'ani/other/pos_tip',
        },
        aim: {
            type: 'DragonBone',
            path: 'ani/other/aim',
        },
        energy_light: {
            type: 'DragonBone',
            path: 'ani/other/energy_light',
        },
        award_big: {
            type: 'DragonBone',
            path: 'ani/other/award_big',
        },
        award_light: {
            type: 'DragonBone',
            path: 'ani/other/award_light',
        },
        coin: {
            type: 'DragonBone',
            path: 'ani/other/coin',
        },
        skill_border_light: {
            type: 'DragonBone',
            path: 'ani/other/skill_border_light',
        },
    },
};
