import { Lang, InternationalTip } from 'data/internationalConfig';
import { modelState } from 'model/modelState';
import { AccountMap, UserInfoEvent } from 'model/userInfo/userInfoModel';

export function onLangChange(item: any, callback: (lang: Lang) => void) {
    const { user_info } = modelState.app;
    const { event, lang } = user_info;
    event.on(UserInfoEvent.LangChange, callback, item);
    setTimeout(() => {
        if (lang) {
            callback(lang);
        }
    });
}
export function getLang() {
    const { user_info } = modelState.app;
    const { lang } = user_info;
    return lang;
}

export function offLangChange(item: any) {
    const { event } = modelState.app.user_info;
    event.offAllCaller(item);
}
export function onCurBalanceChange(
    item: any,
    callback: (type: string) => void,
) {
    const { user_info } = modelState.app;
    const { cur_balance: cur_coin, event } = user_info;
    event.on(UserInfoEvent.CurBalanceChange, callback, item);
    setTimeout(() => {
        if (cur_coin) {
            callback(cur_coin);
        }
    });
}
export function onNicknameChange(
    item: any,
    callback: (nickname: string) => void,
) {
    const { user_info } = modelState.app;
    const { event } = user_info;
    let { nickname } = user_info;
    event.on(UserInfoEvent.NicknameChange, callback, item);
    setTimeout(() => {
        const lang = getLang();
        const { guest } = InternationalTip[lang];
        if (!nickname) {
            nickname = guest;
        }
        callback(nickname);
    });
}
export function onAccountChange(
    item: any,
    callback: (info: AccountMap) => void,
) {
    const { user_info } = modelState.app;
    const { event, account_map } = user_info;
    event.on(UserInfoEvent.AccountChange, callback, item);
    setTimeout(() => {
        if (account_map) {
            callback(account_map);
        }
    });
}

export function offBindEvent(item: any) {
    const { user_info, setting } = modelState.app;
    const { event: user_info_event } = user_info;
    const { event: setting_event } = setting;
    user_info_event.offAllCaller(item);
    setting_event.offAllCaller(item);
}

export function getAllLangList() {
    const result = [];
    for (const key in Lang) {
        if (!Lang.hasOwnProperty(key)) {
            continue;
        }
        result.push(Lang[key]);
    }
    return result;
}
