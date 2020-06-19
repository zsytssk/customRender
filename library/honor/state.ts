import { DialogManagerCtor } from './ui/dialogManager';
import { SceneManagerCtor } from './ui/SceneManager';
import { LoaderManagerCtor } from './ui/LoaderManager';
import { DirectorCtor } from './ui/director';

export let dialogManager: DialogManagerCtor;
export let loaderManager: LoaderManagerCtor;
export let sceneManager: SceneManagerCtor;
export let director = new DirectorCtor();

let init_resolve = [] as Array<() => void>;
let is_init = false;
/** 等到所有的组件都初始化之后 resolve */
export function untilInit() {
    return new Promise((resolve, reject) => {
        if (is_init) {
            return resolve();
        }
        init_resolve.push(resolve);
    });
}
/** 一切初始化+全局变量都在这里 */
export function initState() {
    sceneManager = new SceneManagerCtor();
    loaderManager = new LoaderManagerCtor();
    dialogManager = new DialogManagerCtor();
    director.init();

    if (init_resolve) {
        for (const item of init_resolve) {
            item();
        }
        is_init = true;
        init_resolve = undefined;
    }
}
