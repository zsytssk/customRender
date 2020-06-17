import { Laya, loader } from 'Laya';
import { AtlasInfoManager } from 'laya/net/AtlasInfoManager';
import { Handler } from 'laya/utils/Handler';

export function layaInit() {
    return new Promise((resolve) => {
        Laya.init(1130, 750);
        Laya.stage.scaleMode = 'fixedheight';
        Laya.stage.screenMode = 'horizontal';
        Laya.stage.alignV = 'middle';
        Laya.stage.alignH = 'center';
        AtlasInfoManager.enable(
            'fileconfig.json',
            Handler.create(null, async () => {
                resolve();
            }),
        );
    });
}

export type FunProgress = (progress: number) => void;

/** 加载资源... */
export function loadRes(res: string[], on_progress?: FunProgress) {
    return new Promise((resolve, reject) => {
        let loading_fun: Handler;
        if (on_progress) {
            loading_fun = new Handler(
                null,
                (val: number) => {
                    on_progress(val);
                },
                null,
                false,
            );
        }
        const loaded_fn = new Handler(this, () => {
            setImmediate(resolve);
        });

        loader.load(res, loaded_fn, loading_fun);
    });
}
