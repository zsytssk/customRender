/** socket 名 */
export const ServerName = {
    /** 游戏的 socket */
    Game: 'game',
    /** 大厅的 socket */
    Hall: 'hall',
};

/** socket 错误码 */
export enum ServerErrCode {
    TokenExpire = 1002,
}

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
    SetRobotReport: 'setRobotReport',
    UseFreeze: 'useFreeze',
    FreezeOver: 'freezeOver',

    /** 其他部分 */
    ErrCode: 'conn::error',
    UserAccount: 'userAccount',
    GetDomain: 'getDomain',
    Lottery: 'lottery',
    LotteryList: 'lotteryList',
    ExchangeList: 'exchangeList',
    TicketExchange: 'ticketExchange',
    ShopList: 'shopList',
    UseSkin: 'useSkin',
    Buy: 'buy',
    /** 获取游客 TOKEN */
    GetGuestToken: 'getRequestId',
    /** 获取用户信息 */
    GetUserInfo: 'getUserInfo',
};
