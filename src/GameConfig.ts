/*
 * 游戏初始化配置;
 */
export default class GameConfig {
    static width: number = 1920;
    static height: number = 750;
    static scaleMode: string = 'fixedheight';
    static screenMode: string = 'none';
    static alignV: string = 'top';
    static alignH: string = 'left';
    static startScene: any = 'scenes/hall/hall.scene';
    static sceneRoot: string = '';
    static debug: boolean = false;
    static stat: boolean = false;
    static physicsDebug: boolean = false;
    static exportSceneToJson: boolean = true;
    constructor() {}
    static init() {}
}
GameConfig.init();
