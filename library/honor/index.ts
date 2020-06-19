import { initState, director } from './state';
import { utils } from './utils/index';
import { loadRes } from './utils/loadRes';
import { Laya, loader } from 'Laya';
// import { Laya3D } from 'Laya3D';
import { Stat } from 'laya/utils/Stat';
import { AtlasInfoManager } from 'laya/net/AtlasInfoManager';
import { Handler } from 'laya/utils/Handler';
import { WebGL } from 'laya/webgl/WebGL';
import { Stage } from 'laya/display/Stage';
import { Utils } from 'laya/utils/Utils';
import { URL } from 'laya/net/URL';
export type {
    HonorDialog,
    HonorDialogConfig,
    HonorScene,
    HonorLoadScene,
} from './ui/view';

export type GameConfig = any;
export type HonorExternConfig = {
    basePath?: string;
    versionPath?: string;
    defaultVersion?: string;
};
const name = 'Honor';
const version = '1.0.0-beta';
let DEBUG_MODE = false;

declare global {
    interface Window {
        Laya3D: any;
    }
}

/** 运行游戏
 * @param game_config 是Laya自动生成的游戏配置 src/GameConfig
 * @param extern_config Honor 需要的配置
 */
async function run(
    game_config: GameConfig,
    extern_config: HonorExternConfig = {},
) {
    // 根据IDE设置初始化引擎
    Laya.init(game_config.width, game_config.height, WebGL);
    Laya.stage.frameRate = Stage.FRAME_SLOW;
    if ((Laya as any).DebugPanel) {
        (Laya as any).DebugPanel.enable();
    }
    URL.basePath = extern_config.basePath || URL.basePath;
    Laya.stage.scaleMode = game_config.scaleMode;
    Laya.stage.screenMode = game_config.screenMode;
    Laya.stage.alignV = game_config.alignV;
    Laya.stage.alignH = game_config.alignH;
    // 兼容微信不支持加载scene后缀场景
    URL.exportSceneToJson = game_config.exportSceneToJson;

    // 打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
    if (game_config.debug || Utils.getQueryString('debug') === 'true') {
        DEBUG_MODE = true;
        Laya.enableDebugPanel();
    } else {
        DEBUG_MODE = false;
    }
    if (game_config.stat) {
        Stat.show(0, 0);
    }
    Laya.alertGlobalError(false);

    let { defaultVersion } = extern_config;
    defaultVersion = defaultVersion || '0';
    URL.customFormat = (url: string) => {
        const version_map = URL.version || {};
        if (url.indexOf('data:image') < 0) {
            if (url.indexOf('?') < 0 && url.indexOf('?v=') < 0) {
                let v = version_map[url];
                if (!v && defaultVersion) {
                    v = defaultVersion;
                }
                url += '?v=' + v;
            }
        }
        return url;
    };

    const start_task: Array<Promise<any>> = [];
    // 激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    const fileconfig_task = new Promise((resolve, reject) => {
        AtlasInfoManager.enable(
            'fileconfig.json',
            Handler.create(null, async () => {
                resolve();
            }),
        );
    });
    start_task.push(fileconfig_task);

    const { versionPath } = extern_config;
    if (versionPath) {
        start_task.push(loadRes([versionPath]));
    }

    await Promise.all(start_task);

    if (versionPath) {
        URL.version = loader.getRes(versionPath);
    }

    initState();
}

export default { name, version, run, director, utils, DEBUG_MODE };
