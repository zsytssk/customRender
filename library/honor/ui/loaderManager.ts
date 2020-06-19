import { ViewType, HonorLoadScene, HonorView } from './view';
import { ResItem, loadRes } from 'honor/utils/loadRes';
import { Scene } from 'laya/display/Scene';
import { Dialog } from 'laya/ui/Dialog';
import { Handler } from 'laya/utils/Handler';

type LoadingMap = Map<ViewType, HonorLoadScene>;

export class LoaderManagerCtor {
    /** 强制, toggleLoading不在有效, 用于有多个loading的情形, 一直显示loading */
    public force = false;
    private load_map = new Map() as LoadingMap;
    public loadScene(type: ViewType, url: string) {
        return new Promise((resolve, reject) => {
            const ctor = type === 'Scene' ? Scene : Dialog;
            ctor.load(
                url,
                Handler.create(this, (_scene: HonorView) => {
                    resolve(_scene);
                    this.toggleLoading(type, false);
                }),
                Handler.create(this, this.setLoadProgress, [type], false),
            );
            this.toggleLoading(type, true);
        });
    }
    public load(res: ResItem[] | string[], type?: ViewType) {
        return new Promise(async (resolve, reject) => {
            this.toggleLoading(type, true);

            let load_progress_fn;
            if (type) {
                load_progress_fn = (val: number) => {
                    this.setLoadProgress(type, val);
                };
            }
            await loadRes(res, load_progress_fn);

            /** 如果显示loading, 最少显示500ms */
            this.toggleLoading(type, false);
            return resolve();
        });
    }

    public toggleLoading(type: ViewType, status: boolean) {
        if (!type) {
            return;
        }
        if (this.force) {
            return;
        }
        let time = 0;
        if (status === false) {
            time = 1000;
        }
        clearTimeout(
            this[`${type}_timeout_${status}` as keyof LoaderManagerCtor] as any,
        );
        this[
            `${type}_timeout_${status}` as keyof LoaderManagerCtor
        ] = setTimeout(() => {
            this.setLoadViewVisible(type, status);
        }, time) as any;
    }
    public async setLoadView(type: ViewType, url: string) {
        const ctor = type === 'Scene' ? Scene : Dialog;
        const scene: HonorLoadScene = await new Promise((resolve, reject) => {
            ctor.load(
                url,
                Handler.create(null, (_scene: HonorLoadScene) => {
                    resolve(_scene);
                }),
            );
        });

        this.load_map.set(type, scene);
    }
    /**
     * @param force 强制, toggleLoading不在有效
     */
    public setLoadViewVisible(type: ViewType, visible: boolean, force = false) {
        const load_scene = this.load_map.get(type);
        this.force = force;
        if (!load_scene) {
            return;
        }
        if (visible) {
            load_scene.onShow();
        } else {
            load_scene.onHide();
        }
    }
    public setLoadProgress(type: ViewType, val: number) {
        const load_scene = this.load_map.get(type);
        if (!load_scene) {
            return;
        }
        load_scene.onProgress(val);
    }
}
