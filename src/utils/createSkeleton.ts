import { Templet } from 'laya/ani/bone/Templet';
import { loader } from 'Laya';
import { Animation } from 'laya/display/Animation';
import { Image } from 'laya/ui/Image';

const temple_pool: {
    [key: string]: Templet;
} = {};
/**
 * @public
 * 创建骨骼动画
 * @param {String} path 骨骼动画路径
 * @param {Number} rate 骨骼动画帧率，引擎默认为30，一般传24
 * @param {Number} type 动画类型 0,使用模板缓冲的数据，模板缓冲的数据，不允许修改	（内存开销小，计算开销小，不支持换装） 1,使用动画自己的缓冲区，每个动画都会有自己的缓冲区，相当耗费内存 （内存开销大，计算开销小，支持换装） 2,使用动态方式，去实时去画	（内存开销小，计算开销大，支持换装,不建议使用）
 *
 * @return 骨骼动画
 */
export function createSkeleton(path: string, rate?: number, type?: number) {
    rate = rate || 30;
    type = type || 0;
    const png = loader.getRes(path + '.png');
    const sk = loader.getRes(path + '.sk');

    if (!png || !sk) {
        return undefined;
    }
    let temple: Templet;
    if (temple_pool[path]) {
        temple = temple_pool[path];
    } else {
        temple = new Templet();
        temple.parseData(png, sk, 24);
        temple_pool[path] = temple;
    }
    const templet = new Templet();
    templet.parseData(png, sk, rate);

    return templet.buildArmature(type);
}

/**
 * 创建帧动画
 * @param path 动画的路径
 */
export function createAnimation(path: string): Animation {
    const ani = new Animation();
    ani.loadAtlas(path + '.json');
    ani.interval = 120;
    ani.index = 1;
    ani.play();

    const bounds = ani.getGraphicBounds();
    ani.pivot(bounds.width / 2, bounds.height / 2);
    return ani;
}

/**
 * 创建帧动画
 * @param path 动画的路径
 */
export function createImg(path: string): Image {
    const sprite = new Image();
    sprite.loadImage(path + '.png');
    return sprite;
}
