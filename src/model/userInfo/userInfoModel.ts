import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { Lang } from 'data/internationalConfig';
import { getCacheBalance, setCacheBalance } from './userInfoUtils';

/** 账户信息修改 */
export const UserInfoEvent = {
    CurBalanceChange: 'cur_balance_change',
    LangChange: 'lang_change',
    AccountChange: 'account_change',
    NicknameChange: 'nick_name_change',
};
export type AccountMap = Map<string, { num: number; icon: string }>;
/** 当前用户信息.. */
export class UserInfoModel extends ComponentManager {
    /** 语言 */
    public lang: Lang;
    /** 当前钱币类型 */
    public cur_balance: string;
    /** 用户id */
    public user_id: string;
    /** 用户名 */
    public nickname: string;
    /** 账户信息 */
    public account_map: AccountMap = new Map();
    constructor() {
        super();
    }
    public get event() {
        let event = this.getCom(EventCom);
        if (!event) {
            event = new EventCom();
            this.addCom(event);
        }
        return event;
    }
    /** 选择当前用户当前的coin类型 */
    public setCurBalance(balance: string, force_change = false) {
        if (balance === this.cur_balance && !force_change) {
            return;
        }
        this.cur_balance = balance;
        setCacheBalance(balance);
        this.event.emit(UserInfoEvent.CurBalanceChange, balance);
    }
    public setLang(lang: Lang) {
        if (lang === this.lang) {
            return;
        }
        this.lang = lang;
        this.event.emit(UserInfoEvent.LangChange, lang);
    }
    public setUserId(name: string) {
        this.user_id = name;
    }
    public setNickname(name: string) {
        this.nickname = name;
        this.event.emit(UserInfoEvent.NicknameChange, this.nickname);
    }
    /** 选择当前用户的coin */
    public setAccount(data: UserAccountRep['balances']) {
        let first_balance: string;
        for (const key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }
            if (!first_balance) {
                first_balance = key;
            }
            const { balance: num, imageUrl: icon } = data[key];
            this.account_map.set(key, {
                num,
                icon,
            });
        }
        this.event.emit(UserInfoEvent.AccountChange, this.account_map);
        const cur_balance = getCacheBalance();

        /** 强制更新当前货币, 防止 货币数目发生变化 */
        this.setCurBalance(cur_balance || first_balance, true);
    }
}
