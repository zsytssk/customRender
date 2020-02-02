// http://gitlab.intranet.huiyin.com/springfans/game/game-bitfish-server/blob/docker/API.md
// import {} from 'data/serverEvent';

type RoomInReq = {
    roomId: number;
    /** 是否试玩 */
    isTrial: 0 | 1;
    /** 币种 */
    currency: string;
    /** 域名 */
    domain: string;
};

type RoomInRep = {
    roomId: number;
    bulletNum: number;
    socketUrl: string;
};
type CheckReplayRep = {
    isReplay: boolean;
    socketUrl: string;
};
type TableOutRep = {
    userId: string;
};
type TableInRep = {
    index: number;
    userId: string;
    multiple: number;
    turretSkin: string;
};
/** 用户的数据 */
type ServerUserInfo = {
    index: number;
    userId: string;
    bulletNum: number;
    multiple: number;
    turretSkin: string;
    lockFish: string;
    lockLeft: number;
};

type displaceType = 'path' | 'fun';
type ServerFishInfo = {
    eid: string;
    fishId: string;
    group?: {
        eid: string;
        score: number;
        index: number;
    }[];
    displaceType: displaceType;
    pathNo?: string;
    pathList?: number[][];
    usedTime: number;
    totalTime: number;
    displaceLen?: number;
    dieReBorn?: boolean;
    funList?: {
        funNo?: string;
        radio: number;
        params?: any[];
    }[];
    reverse?: boolean;
    frozen?: boolean;
    startTime?: number;
    inScreen?: boolean;
    /** 鱼分数 */
    score: number;
};
type ServerItemInfo = {
    itemId: string;
    count: number;
    coolTime: number;
    usedTime: number;
};
type ServerAddFishRep = {
    fish: ServerFishInfo[];
};

/** 复盘 */
type EnterGameRep = {
    roomId: number;
    rate: number;
    tableId: string;
    frozen: boolean;
    frozenLeft: number;
    users: ServerUserInfo[];
    fish: ServerFishInfo[];
    items: ServerItemInfo[];
};

type RoomOutRep = {
    userId: string;
};
type ShootReq = {
    direction: Point;
};
type ShootRep = {
    userId: string;
    direction: Point;
};
type HitReq = {
    eid: string;
    multiple: number;
};
type HitDrop = {
    itemId: string;
    itemNum: number;
};
type HitRep = {
    userId?: string;
    eid: string;
    bet?: string;
    win: number;
    balance?: number;
    drop: HitDrop[];
};
/** 换炮台等级 */
type ChangeTurretReq = {
    multiple: number;
};
type ChangeTurretRep = {
    userId: string;
    multiple: number;
};
type FishShoalWarnRep = {
    shoalId: string;
    delay: number;
};
type FishShoal = {
    shoalId: string;
    reverse: boolean;
    fish: ServerFishInfo[];
};
type UseFreezeRep = {
    userId: string;
    count: number;
    duration: number;
    frozenFishList: string[];
};

type FreezeOverRep = {
    tableId: string;
};
type UseLockRep = {
    userId: string;
    count: number;
    lockedFish: string;
    duration: number;
};
/** 锁定鱼 */
type LockFishRep = {
    eid: string;
};
type LockFishReq = {
    userId: string;
    eid: string;
};
type FishBombReq = {
    bombPoint: Point;
    eid: string;
    fishList: string[];
};
type FishBombRep = {
    userId: string;
    bombPoint: Point;
    killedFish: UseBombFishInfo[];
};
type UseBombReq = {
    bombPoint: Point;
    fishList: string[];
};

type UseBombFishInfo = {
    eid: string;
    win: number;
    drop?: HitDrop[];
};
type UseBombRep = {
    userId: string;
    bombPoint: Point;
    count: number;
    killedFish: UseBombFishInfo[];
    balance?: number;
};

type PowerUpRep = {
    userId: string;
    duration: number;
};
type SetRobotReportRep = {};
type UserAccountRep = {
    userId: string;
    email: string;
    showName: string;
    balances: {
        [key: string]: {
            balance: number;
            imageUrl: string;
        };
    };
};
type GetDomainRep = {
    domain: string;
    cdn: string;
    api: string;
    sso: string;
    domainRecharge: string;
    channelRecharge: string;
    homeUrl: string;
    roomApi: string;
    serverApi: string;
    newServerApi: string;
};

type ShopItem = {
    type: number;
    item_id: string;
    name: string;
    price: number;
    num: number;
    /** 0购买 1已获得 2已穿戴 */
    status: 0 | 1 | 2;
};
type ShopListRep = ShopItem[];

type BuyReq = {
    itemId: string;
    num: number;
};
type BuyRep = {
    name: number;
    num: string;
};

type UseSkinReq = {
    skinId: string;
};
type UseSkinRep = UseSkinReq;

type ItemPrice = {
    id: string;
    count: number;
    name: string;
};
type LotteryRep = LotteryItem;

type LotteryItem = { id: string; num: number; name: string };
type LotteryListRep = {
    list: LotteryItem[];
    curNum: number;
    costNum: number;
};

type ExchangeItemData = {
    itemId: string;
    num: number;
    name: string;
    cost: number;
    curNum: number;
};
type ExchangeListRep = {
    list: ExchangeItemData[];
};
type TicketExchangeRep = ExchangeItemData;
