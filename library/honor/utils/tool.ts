import { Scene } from 'laya/display/Scene';
import { Node } from 'laya/display/Node';
import { Sprite } from 'laya/display/Sprite';

/** 在class的fun执行之后执行fun */
export function injectAfter<T extends {}, K extends ObjFilterKeys<T, Function>>(
    instance: T,
    fun_name: K,
    func: Func<any>,
) {
    const ori_fun = instance[fun_name] as Func<any>;
    instance[fun_name] = function (...params: any[]) {
        const result = ori_fun.apply(this, [...params]);
        afterPromise(result, () => {
            func(this, result, ...params);
        });
        return result;
    } as any;

    return () => {
        instance[fun_name] = ori_fun as any;
    };
}

function afterPromise(result: any, fun: () => void) {
    if (result instanceof Promise) {
        result.then(_result => {
            afterPromise(_result, fun);
        });
    } else {
        fun();
    }
}

export function injectProto<T extends {}, K extends ObjFilterKeys<T, Function>>(
    ctor: Ctor<T>,
    fun_name: K,
    func: Func<any>,
    once?: boolean,
) {
    const ori_fun = ctor.prototype[fun_name];
    ctor.prototype[fun_name] = function (...params: any[]) {
        const result = ori_fun.apply(this, [...params]);
        if (result instanceof Promise) {
            result.then(() => {
                func(this, result, ...params);
            });
        } else {
            func(this, result, ...params);
        }
        if (once) {
            ctor.prototype[fun_name] = ori_fun;
        }
        return result;
    };

    return () => {
        ctor.prototype[fun_name] = ori_fun as any;
    };
}

/** 之所以要这个处理, 为了解决外嵌模式需要loadScene本身的资源, 干净的类 class不需要
 *  所有通过 loadScene 有没有调用来监听
 * 这是hack的方法
 */
export function createScene(ctor: Ctor<Scene>): Promise<Scene> {
    return new Promise((resolve, reject) => {
        const instance = new ctor();
        return resolve(instance);
    }) as Promise<Scene>;
}

export function afterActive(node: Sprite) {
    return new Promise((resolve, reject) => {
        if (node.active) {
            return resolve();
        }
        node.once('onViewCreated', this, () => {
            return resolve();
        });
    });
}
export function afterEnable(node: Node) {
    return new Promise((resolve, reject) => {
        if (node.active) {
            return resolve();
        }
        injectAfter(node, 'onEnable', () => {
            resolve();
        });
        injectAfter(node, 'onDestroy', () => {
            reject();
        });
    });
}
