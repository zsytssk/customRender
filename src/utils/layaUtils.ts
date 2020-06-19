import { Laya } from 'Laya';
import { Node } from 'laya/display/Node';
import { Observable, Subscriber } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { Sprite } from 'laya/display/Sprite';
import { Event } from 'laya/events/Event';

export function onStageClick(
    node: Node,
    callback: (event?: Event) => void,
    ignore_list?: Node[],
    once = false,
) {
    let once_observer: Subscriber<Event>;
    const observer = new Observable((subscriber: Subscriber<Event>) => {
        const fn = (_event: Event) => {
            if (ignore_list) {
                const target = _event.target;
                for (const ignore_item of ignore_list) {
                    if (isClosest(target, ignore_item)) {
                        return;
                    }
                }
            }
            subscriber.next(_event);
            once_observer = subscriber;
            if (once) {
                subscriber.complete();
            }
        };
        Laya.stage.on(Event.CLICK, node, fn);
        subscriber.add(() => {
            Laya.stage.off(Event.CLICK, node, fn);
        });
    });

    observer.subscribe((_event: Event) => {
        if (node && node.destroyed) {
            if (once_observer) {
                once_observer.complete();
            }
            return;
        }

        callback.call(node, _event);
    });
}

type ClickNode = Sprite & {
    is_disable: boolean;
};
/**
 * 在按钮上绑定事件, 防止多次点击事件导致
 * @param node 绑定的节点
 * @param event 绑定的事件
 * @param callback 执行函数
 * @param once 是否执行一次
 * @param throttle 间隔的时间 默认1s
 */
export function onNode(
    node: Sprite,
    event: string,
    callback: (event?: Event) => void,
    once?: boolean,
    throttle = 1000,
) {
    let once_observer: Subscriber<Event>;
    const observer = new Observable((subscriber: Subscriber<Event>) => {
        const fn = (_event: Event) => {
            /** 按钮置灰 */
            if ((node as ClickNode).is_disable === true) {
                return;
            }
            (node as ClickNode).is_disable = true;
            setTimeout(() => {
                if (node && node.destroyed) {
                    return;
                }
                (node as ClickNode).is_disable = false;
            }, throttle);

            subscriber.next(_event);
            once_observer = subscriber;
            if (once) {
                subscriber.complete();
            }
        };
        node.on(event, node, fn);
        subscriber.add(() => {
            node.off(event, node, fn);
        });
    });

    observer.pipe(throttleTime(throttle || 1000)).subscribe((_event: Event) => {
        if (node && node.destroyed) {
            if (once_observer) {
                once_observer.complete();
            }
            return;
        }

        callback(_event);
    });
}

const bind_arr = [] as Array<{
    item: Sprite;
    off: () => void;
}>;
export function onMouseMove(view: Sprite, callback: (pos: Point) => void) {
    const { MOUSE_MOVE } = Event;
    const fn = e => {
        console.log(e);
        const { x, y } = view.getMousePoint();
        callback({ x, y });
    };
    view.on(MOUSE_MOVE, view, fn);
    bind_arr.push({
        item: view,
        off: () => {
            view.off(MOUSE_MOVE, view, fn);
        },
    });
}

export function offMouseMove(node: Sprite) {
    for (let len = bind_arr.length, i = len - 1; i >= 0; i--) {
        const { item, off } = bind_arr[i];
        if (item === node) {
            off();
            bind_arr.splice(i, 1);
        }
    }
}

/** 自适应宽度 */
export function resizeParent(child: Sprite, space: number, min?: number) {
    const parent = child.parent as Sprite;
    resizeContain(parent as Sprite, space);

    if (min && parent.width < min) {
        parent.width = min;
    }
}
type Dir = 'horizontal' | 'vertical';
/** 自适应宽度 */
export function resizeContain(
    parent: Sprite,
    space: number,
    dir = 'horizontal' as Dir,
) {
    const { numChildren } = parent;

    const children = [];
    let dist = 0;
    for (let i = 0; i < numChildren; i++) {
        const item = parent.getChildAt(i) as Sprite;
        if (!item.visible) {
            continue;
        }
        children.push(item);
    }
    for (let i = 0; i < children.length; i++) {
        const item = children[i];
        if (dir === 'horizontal') {
            item.x = dist;
        } else {
            item.y = dist;
        }

        if (dir === 'horizontal') {
            if (i !== children.length - 1) {
                dist += item.width + space;
            } else {
                dist += item.width;
            }
        } else {
            if (i !== children.length - 1) {
                dist += item.height + space;
            } else {
                dist += item.height;
            }
        }
    }

    if (dir === 'horizontal') {
        parent.width = dist;
    } else {
        parent.height = dist;
    }
}

export function isClosest(dom_item: Node, dom_parent: Node) {
    if (!dom_item) {
        return false;
    }
    if (dom_item === dom_parent) {
        return true;
    }
    const parent = dom_item.parent;
    return isClosest(parent, dom_parent);
}

export function getRectRadiusPath(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
) {
    return [
        ['moveTo', x + radius, y],
        ['lineTo', x + width - radius, y],
        ['arcTo', x + width, y, x + width, y + radius, radius],
        ['lineTo', x + width, y + height - radius],
        [
            'arcTo',
            x + width,
            y + height,
            x + width - radius,
            y + height,
            radius,
        ],
        ['lineTo', x + radius, y + height],
        ['arcTo', x, y + height, x, y + height - radius, radius],
        ['lineTo', x, y + radius],
        ['arcTo', x, y, x + radius, y, radius],
        ['closePath'],
    ];
}
