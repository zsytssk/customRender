import { Sprite } from 'laya/display/Sprite';
import { Laya } from 'Laya';
import { Point } from 'laya/maths/Point';

type EleInfo = {
    displayName: string;
    hideAfterTimeout: boolean;
    id: number;
    openNativeElementsPanel: boolean;
    rendererID: number;
    scrollIntoView: boolean;
};

export function injectDevTool(reconcilerInstance: any) {
    reconcilerInstance.injectIntoDevTools({
        bundleType: process.env.NODE_ENV !== 'production' ? 1 : 0,
        version: '16.13.1',
        rendererPackageName: 'react-laya',
    });
}

export function initDevTool() {
    const view = new Sprite();
    Laya.stage.addChild(view);
    view.zOrder = Infinity;
    view.alpha = 0.5;

    __REACT_DEVTOOLS_GLOBAL_HOOK__?.reactDevtoolsAgent?._bridge.addListener(
        'highlightNativeElement',
        (eleInfo: EleInfo) => {
            const { id, rendererID } = eleInfo;
            const renderer = __REACT_DEVTOOLS_GLOBAL_HOOK__?.rendererInterfaces.get(
                rendererID,
            );

            const node_list = renderer.findNativeNodesForFiberID(
                id,
            ) as Sprite[];

            for (const node of node_list) {
                if (!node.visible) {
                    continue;
                }
                const { width, height } = node.getBounds();
                const start = node.localToGlobal(new Point(0, 0));

                view.graphics.clear();
                view.graphics.drawRect(
                    start.x,
                    start.y,
                    width,
                    height,
                    '#0095ff',
                );
            }
        },
    );
}
