import SAT from 'sat';
import { Coordinates } from 'data/coordinate';
import { SpriteType, SpriteInfo } from 'data/sprite';
import { SPRITE } from 'data/sprite';
import { SHAPE } from 'data/shape';
import { vectorToAngle } from './mathUtils';
import { GunInfo } from 'data/gun';
import { FishModel } from 'model/game/fish/fishModel';
import { Sprite } from 'laya/display/Sprite';
import { Box } from 'laya/ui/Box';
import { createSkeleton, createAnimation, createImg } from './createSkeleton';

/** 获取皮肤对应的id */
export function getGunSkinMap(skin: string, level: string) {
    const ani_list = SPRITE.gun[skin];
    const result = new Map() as Map<string, string>;
    for (const ani_name of ani_list) {
        if (ani_name === 'body' && skin === '5') {
            result.set(ani_name, `${skin}`);
        } else {
            result.set(ani_name, `${skin}${level}`);
        }
    }
    return result;
}
export function getGunInfo(server_index: number) {
    const pos = Coordinates.gun_global_pos[server_index];
    return {
        pos,
    };
}
export function getGunLevelSkinInfo(level: number) {
    const { LevelUp: level_up, HoleNum: hole_num } = GunInfo;
    for (let i = 0; i < level_up.length; i++) {
        const item = level_up[i];
        if (level < item) {
            return {
                level_skin: `${i + 1}`,
                hole_num: hole_num[i],
            };
        }
    }

    return {
        level_skin: `${3}`,
        hole_num: hole_num[2],
    };
}
/** 获取sprite的信息 */
export function getSpriteInfo(type: SpriteType, sub_type: string): SpriteInfo {
    let sprite_info = SPRITE[type][sub_type];
    if (sprite_info.as) {
        sprite_info = SPRITE[type][sprite_info.as];
    }
    return sprite_info;
}
/** 获取形状信息 */
export function getShapeInfo(type: SpriteType, level?: number | string) {
    let shape_info = SHAPE[type][level] || SHAPE[type]['1'] || SHAPE[type];
    if (shape_info.as) {
        shape_info = SPRITE[type][shape_info.as];
    }
    return shape_info;
}

/**
 * 获取子弹发射的开始位置, 返回的子弹发射开始位置数组, 多个表示多个子弹同时发射
 * @param server_index 用户的服务器index
 * @param direction 大炮的方向
 */
export function getBulletStartPos(
    server_index: number,
    direction: SAT.Vector,
    skin: string,
): Point[] {
    const offsets = Coordinates.bullet_offset[skin];
    const result: Point[] = [];
    const offset_v = direction
        .clone()
        .normalize()
        .rotate(Math.PI / 2);
    for (const offset of offsets) {
        const nv = offset_v.clone().scale(offset, offset);
        const server_client_index = server_index;
        const gun_global_pos: Point =
            Coordinates.gun_global_pos[server_client_index];
        const gun_origin_pos: Point = Coordinates.guns_inside_pos.origin_point;
        const gun_start_point: Point = Coordinates.guns_inside_pos.start_point;
        let x: number;
        let y: number;

        if (server_client_index <= 1) {
            x = gun_start_point.x - gun_origin_pos.x;
            y = gun_start_point.y - gun_origin_pos.y;
        } else {
            // 上面的炮台的位置 子弹gun_start_point相对于gun_origin_pos的位置正好是与底下的相反
            x = gun_origin_pos.x - gun_start_point.x;
            y = gun_origin_pos.y - gun_start_point.y;
        }
        let vector = new SAT.Vector(x, y);
        /** 向量需要转动的角度 */
        let angle: number;
        if (server_client_index <= 1) {
            // 底下的gun的大炮的初始角度是-Math.PI / 2
            angle = vectorToAngle(direction) + Math.PI / 2;
        } else {
            // 底下的gun的大炮的初始角度是Math.PI / 2
            angle = vectorToAngle(direction) - Math.PI / 2;
        }
        vector = vector.rotate(angle);
        x = gun_global_pos.x + vector.x + nv.x;
        y = gun_global_pos.y + vector.y + nv.y;
        result.push({ x, y });
    }
    return result;
}

/**
 * 创建sprite
 * @param type 精灵的类型
 * @param level type的等级
 * @param callback 创建之后扔给的异步函数
 */
export function createSprite(
    sprite_type: SpriteType,
    sub_type: string,
): Sprite {
    const sprite_info = getSpriteInfo(sprite_type, sub_type) as SpriteInfo;
    const { type, path } = sprite_info;
    let pivot = sprite_info.pivot || { x: 0, y: 0 };

    let sprite: Sprite;
    if (type === 'DragonBone') {
        sprite = createSkeleton(path);
    } else if (type === 'Frame') {
        sprite = createAnimation(path);
    } else {
        sprite = createImg(path);

        if (!pivot.x && !pivot.y) {
            const bounds = sprite.getBounds();
            pivot = {
                x: bounds.width / 2,
                y: bounds.height / 2,
            };
        }
    }

    sprite.pivot(pivot.x, pivot.y);

    return sprite;
}

export function createGunBox(level: number) {
    const gun_box = new Box();
    const gun_inner = new Box();

    gun_box.size(149, 149);
    gun_inner.pos(74, 77);
    gun_box.addChild(gun_inner);

    const base = createSkeleton(`ani/gun/gun${level}/base`);
    const light = createSkeleton(`ani/gun/gun${level}/light`);
    const gun = createSkeleton(`ani/gun/gun${level}/gun`);

    gun_inner.addChildren(base, light, gun);
}

/** 判断是否是炸弹贵 */
export function isBombFish(fish: FishModel) {
    return fish.type === '9';
}
