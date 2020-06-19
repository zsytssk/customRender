import { Lang } from './internationalConfig';

declare global {
    interface Window {
        CDN_VERSION: string;
    }
}

type Env = 'DEV' | 'TEST' | 'PROD';
export const Config = {
    Env: ENV as Env,
    PublicKey:
        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMUws+7NKknmImMYUsSr4DOKYVrs1s7BQzGBgkkTptjGiektUmxm3BNZq34ugF6Vob9V0vU5r0S7vfyuOTC87uFeGe+rBJf7si4kE5wsJiEBlLNZjrz0T30xHGJlf+eizYVKPkpo3012rKvHN0obBlN7iBsdiGpLGP3sPAgO2tFQIDAQAB',
    SocketUrl: '',
    code: '',
    token: '',
    lang: 'en' as Lang,
    isLogin: false,
    Host: '',
    /** cdn版本号 */
    CdnVersion: window.CDN_VERSION,
    cndUrl: '',
    /** 子弹速度 */
    BulletSpeed: 25,
    /** 水池的宽度 */
    PoolWidth: 1920,
    /** 水池的高度 */
    PoolHeight: 750,
    /** 子弹运行的宽度 */
    BulletZoneWidth: 1334,
    /** 自动攻击的间隔 ms */
    ShootTimeSpace: 200,
    /** 炸弹的区域 */
    BombRadius: 300,
    /** 鱼潮 清理鱼的时间 */
    ClearFishTime: 2.5,
};
export enum SkillMap {
    LockFish = '2001',
    Freezing = '2002',
    Bomb = '2003',
    Auto = 'A2004',
    Super = 'A2004',
}
export function isSkill(id: string) {}

export const SkillNameMap = {
    [SkillMap.Freezing]: 'freeze',
    [SkillMap.Bomb]: 'bomb',
    [SkillMap.LockFish]: 'aim',
    [SkillMap.Auto]: 'auto',
    [SkillMap.Super]: 'super',
};

export const ItemMap = {
    '3001': 'BTC',
    '3002': 'ETH',
    '3003': 'XRP',
};
