import { Sprite } from 'laya/display/Sprite';
import { Laya } from 'Laya';
import { Point } from 'laya/maths/Point';
import { sleep } from './utils';

type EleInfo = {
    displayName: string;
    hideAfterTimeout: boolean;
    id: number;
    openNativeElementsPanel: boolean;
    rendererID: number;
    scrollIntoView: boolean;
};

const randomKey = Math.random().toString(36).slice(2);
const internalInstanceKey = '__reactFiber$' + randomKey;

export async function initDevTool(reconcilerInstance) {
    await injectDevTool(reconcilerInstance);

    const view = new Sprite();
    Laya.stage.addChild(view);
    view.zOrder = Infinity;
    view.alpha = 0.5;

    const bridge = await getBridge(() => {
        return (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__
            ?.reactDevtoolsAgent?._bridge;
    });
    bridge.addListener('highlightNativeElement', (eleInfo: EleInfo) => {
        const { id, rendererID } = eleInfo;
        const renderer = __REACT_DEVTOOLS_GLOBAL_HOOK__?.rendererInterfaces.get(
            rendererID,
        );

        const node_list =
            (renderer.findNativeNodesForFiberID(id) as Sprite[]) || [];

        for (const node of node_list) {
            if (!node.visible) {
                continue;
            }
            const { width, height } = node.getBounds();
            const start = node.localToGlobal(new Point(0, 0));

            // console.log(`test:>`, start, width, height);
            view.graphics.clear();
            view.graphics.drawRect(start.x, start.y, width, height, '#0095ff');
        }
    });
}

export async function injectDevTool(reconcilerInstance: any) {
    for (let i = 0; i < 5; i++) {
        const result = reconcilerInstance.injectIntoDevTools({
            bundleType: process.env.NODE_ENV !== 'production' ? 1 : 0,
            version: '16.13.1',
            rendererPackageName: 'react-laya',
            findFiberByHostInstance(ele) {
                return ele[internalInstanceKey] || null;
            },
        });

        if (result) {
            return;
        }
        await sleep(0.5);
        continue;
    }
}

export function patchFiberToNode(node, fiber) {
    node[internalInstanceKey] = fiber;
}

export async function getBridge(fn: () => any) {
    for (let i = 0; i < 5; i++) {
        await sleep(1);
        const item = fn();
        if (item) {
            return item;
        }
    }
}
