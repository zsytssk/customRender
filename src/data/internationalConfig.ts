export enum Lang {
    /** 中文 */
    Zh = 'zh',
    /** 韩文 */
    Kor = 'kor',
    /** 英文 */
    En = 'en',
    /** 日文 */
    Jp = 'jp',
}

/** 国际化的资源 */
export const InternationalRes = {};
/** 国际化的提示 */
export const InternationalTip = {
    '404': {
        [Lang.En]: 'not found',
        [Lang.Kor]: '찾지 못하다',
        [Lang.Jp]: 'いらない',
        [Lang.Zh]: '没有发现页面',
    },
};
