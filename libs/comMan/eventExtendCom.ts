/** 监听数据结构 */
export type BindObj = {
    [key: string]: Func<void>;
};
/** 每一个event的数据 */
export type EventData = Array<{
    caller: any;
    callback: Func<any>;
    once?: boolean;
    off?: () => void;
}>;
export const AnyStr = '*';
export type Params = {
    event: string | BindObj;
    callback?: any;
    caller?: any;
    once?: boolean;
    unshift?: boolean;
};
export type OnParams = Params & {
    unshift?: boolean;
};
/**
 * 扩展event, unshift-on, 匹配任意命令
 */
export default class Event {
    protected events: Map<string, EventData> = new Map();

    /**
     * 注册监听
     * @param event
     * @param callback
     * @param caller
     */
    public on({ event, callback, caller, once, unshift }: Params) {
        if (typeof event === 'object') {
            caller = callback;
            for (const event_key in event) {
                if (!event.hasOwnProperty(event_key)) {
                    continue;
                }
                this.on({
                    event: event_key,
                    callback: event[event_key],
                    caller,
                });
            }
            return;
        }

        let events = [];
        if (this.events.has(event)) {
            events = this.events.get(event);
        } else {
            this.events.set(event, events);
        }

        for (const temp of events) {
            if (caller === temp.caller && callback === temp.callback) {
                return;
            }
        }
        const off = () => {
            this.off({ event, callback, caller });
        };

        if (unshift) {
            events.unshift({ caller, callback, once, off });
        } else {
            events.push({ caller, callback, once, off });
        }
    }

    /**
     * 取消监听，如果没有传 callback 或 caller，那么就删除所对应的所有监听
     * @param event
     * @param callback
     * @param caller
     */
    public off({ event, callback, caller }: Params) {
        if (typeof event === 'object') {
            caller = callback;
            for (const event_key in event) {
                if (!event.hasOwnProperty(event_key)) {
                    continue;
                }
                this.off({
                    event: event_key,
                    callback: event[event_key],
                    caller,
                });
            }
            return;
        }

        if (!this.events.has(event)) {
            return;
        }
        if (!callback && !caller) {
            this.events.delete(event);
            return;
        }
        const events = this.events.get(event);
        for (let len = events.length, i = len - 1; i >= 0; i--) {
            if (
                events[i].callback === callback &&
                events[i].caller === caller
            ) {
                events.splice(i, 1);
                break;
            }
        }
    }
    public offCaller(caller: any) {
        for (const events_item of this.events.values()) {
            // 尽量不要这么传参，效率低下
            for (let len = events_item.length, i = len - 1; i >= 0; i--) {
                if (events_item[i].caller === caller) {
                    events_item.splice(i, 1);
                }
            }
        }
    }
    /**
     * 发布消息
     * @param event
     * @param data
     */
    public emit(event: string, ...params: any[]) {
        /** 任意字符可以匹配任何命令 */
        const event_list = [AnyStr, event];
        for (const item of event_list) {
            if (this.events.has(item)) {
                const events = this.events.get(item);
                for (const event_data of events.concat([])) {
                    let result: any;
                    const { callback, once, off } = event_data;
                    if (typeof callback === 'function') {
                        if (item === AnyStr) {
                            result = callback(event, ...params);
                        } else {
                            result = callback(...params);
                        }
                    }
                    if (once) {
                        off();
                    }
                    if (result) {
                        return result;
                    }
                }
            }
        }
    }
    public clear() {
        this.events = new Map();
    }
}
