import { AppModel } from './appModel';
import { BodyCom } from './game/com/bodyCom';
import { detectCollision } from './game/com/bodyComUtil';
import { FishModel } from './game/fish/fishModel';
import { Laya } from 'Laya';
import { Config } from 'data/config';

type ModelState = {
    app: AppModel;
};
export let modelState = {} as ModelState;
/** 获取当前用户信息 */
export function getUserInfo() {
    return modelState.app.user_info;
}
/** 获取当前用户id */
export function getCurUserId() {
    return modelState.app.user_info.user_id;
}
/** 获取鱼 */
export function isCurUser(id: string) {
    return id === modelState.app.user_info.user_id;
}
/** 获取鱼 */
export function getCurPlayer() {
    return modelState.app.game.getCurPlayer();
}
/** 获取鱼 */
export function getPlayerById(id: string) {
    const { game } = modelState.app;
    return game.getPlayerById(id);
}
/** 获取鱼 */
export function getFishById(id: string) {
    const { game } = modelState.app;
    return game.getFishById(id);
}

/** 获取锁定提示鱼
 * 满足两个条件 分数最高 + 没有游离屏幕...
 */
export function getAimFish() {
    const { game } = modelState.app;
    let fish_list = game.getAllFish();
    fish_list = fish_list.filter((fish) => {
        return fish.visible && detectInScreen(fish.pos);
    });

    fish_list = fish_list.sort((a, b) => {
        return b.score - a.score;
    });
    return fish_list[0];
}
/** 获取锁定提示鱼
 * 满足两个条件 分数最高 + 没有游离屏幕...
 */
export function detectInScreen(pos: Point) {
    const { width } = Laya.stage;
    const { PoolWidth: pool_width } = Config;
    const start = (pool_width - width) / 2;
    const end = start + width;
    const { x } = pos;

    return x > start && x < end;
}
/** 检测碰撞到鱼: 获取第一个 */
export function getCollisionFish(ori_body: BodyCom) {
    const { fish_list } = modelState.app.game;
    for (const fish of fish_list) {
        const { body } = fish;
        if (detectCollision(ori_body, body)) {
            return fish;
        }
    }
}
/** 检测碰撞到鱼:所有的 */
export function getCollisionAllFish(
    ori_body: BodyCom,
    contain_list: FishModel[] = [],
) {
    const { fish_list } = modelState.app.game;
    for (const fish of fish_list) {
        if (contain_list.indexOf(fish) !== -1) {
            continue;
        }
        const { body, visible } = fish;

        /** 鱼还没有显示 不需要做碰撞检测... */
        if (!visible) {
            continue;
        }

        if (detectCollision(ori_body, body)) {
            contain_list.push(fish);
        }
    }
    return contain_list;
}
