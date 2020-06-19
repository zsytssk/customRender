import { Laya, loader } from 'Laya';
import { Handler } from 'laya/utils/Handler';

export type FunProgress = (progress: number) => void;
export type ResItem = {
    url: string;
    type: string;
};

/** 加载资源... */
export function loadRes(res: ResItem[] | string[], on_progress?: FunProgress) {
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
