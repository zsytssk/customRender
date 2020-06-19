/** socket 名 */
export const ServerName = {
    /** 游戏的 socket */
    Game: 'game',
    /** 大厅的 socket */
    Hall: 'hall',
};

/** socket 错误码 */
export enum ServerErrCode {
    /** token过期 */
    TokenExpire = 1002,
    /** 异地登陆 */
    OtherLogin = 1003,
    /** 已经在房间中 */
    AlreadyInRoom = 109,
    /** 余额不足 */
    NoMoney = 101,
    /** 重新带入 */
    ReExchange = 112,
    /** 需要登陆 */
    NeedLogin = 114,
    /** TrialTime - hit */
    TrialTimeGame = 117,
    /** TrialNotBullet */
    TrialNotBullet = 116,
    /** 大厅 room in */
    TrialTimeHall = 507,
    /** 网络异常 */
    NetError = 511,
}

export type ErrorData = {
    code: number;
    error: string;
};

/** 服务器端的接口 */
export const ServerEvent = {
    /** 游戏部分 */
    RoomIn: 'roomIn',
    RoomOut: 'roomOut',
    CheckReplay: 'checkReplay',
    /** 进入桌子 */
    TableIn: 'tableIn',
    /** 离开桌子 */
    TableOut: 'tableOut',
    EnterGame: 'enterGame',
    Shoot: 'shoot',
    Hit: 'hit',
    ChangeTurret: 'changeTurret',
    /** 添加鱼 */
    AddFish: 'addFish',
    /** 鱼潮来了提示 */
    FishShoalWarn: 'fishShoalWarn',
    /** 鱼潮 */
    FishShoal: 'fishShoal',
    /** 激活锁定 */
    UseLock: 'useLock',
    /** 锁定<鱼> */
    LockFish: 'lockFish',
    UseBomb: 'useBomb',
    FishBomb: 'fishBomb',
    PowerUp: 'powerUp',
    autoShoot: 'autoShoot',
    SetRobotReport: 'setRobotReport',
    UseFreeze: 'useFreeze',
    FreezeOver: 'freezeOver',
    ExchangeBullet: 'exchangeBullet',
    GetItemList: 'getItemList',
    GetBulletList: 'getBulletList',

    /** 其他部分 */
    ErrCode: 'conn::error',
    UserAccount: 'userAccount',
    GetDomain: 'getDomain',
    Lottery: 'lottery',
    LotteryList: 'lotteryList',
    ExchangeList: 'exchangeList',
    TicketExchange: 'ticketExchange',
    NeedEmitUser: 'needEmitUser',
    ShopList: 'shopList',
    UseSkin: 'useSkin',
    Buy: 'buy',
    /** 获取游客 TOKEN */
    GetGuestToken: 'getRequestId',
    /** 获取用户信息 */
    GetUserInfo: 'getUserInfo',
};
