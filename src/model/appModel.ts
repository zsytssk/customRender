import { GameModel } from './game/gameModel';
import { modelState } from './modelState';
import { SettingModel } from './userInfo/settingModel';
import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { UserInfoModel } from './userInfo/userInfoModel';

/** 全局数据 */
export class AppModel extends ComponentManager {
    public game: GameModel;
    /** 设置信息 */
    public setting: SettingModel;
    /** 用户信息 */
    public user_info: UserInfoModel;
    constructor() {
        super();
        modelState.app = this;

        this.setting = new SettingModel();
        this.user_info = new UserInfoModel();
        this.addCom(new EventCom());
    }
    public init() {
        this.user_info.init();
    }
    public initUserInfo(data: UserAccountRep) {
        this.user_info.initUserInfo(data);
        this.setting.initUserInfo(data);
    }
    public enterGame() {
        let game = this.game;
        if (!game || game.destroyed) {
            game = new GameModel();
        }
        this.game = game;
        return game;
    }
}
