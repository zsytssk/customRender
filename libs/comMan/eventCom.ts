/** 每一个event的数据 */
export type EventData = Set<{
    caller: any;
    callback: Func<any>;
    once?: boolean;
    off?: () => void;
}>;

/**
 * 事件订阅发布构造函数
 */
export class EventCom {
    protected events: Map<string, EventData> = new Map();

    /**
     * 注册监听
     * @param event
     * @param callback
     * @param caller
     */
    public on(
        event: string,
        callback: Func<any>,
        caller?: any,
        once?: boolean,
    ) {
        let events: EventData;
        if (this.events.has(event)) {
            events = this.events.get(event);
        } else {
            events = new Set();
            this.events.set(event, events);
        }

        for (const temp of events) {
            if (caller === temp.caller && callback === temp.callback) {
                return;
            }
        }
        const off = () => {
            this.off(event, callback, caller);
        };

        events.add({ caller, callback, once, off });
    }
    public once(event: string, callback?: Func<any>, caller?: any) {
        return this.on(event, callback, caller, true);
    }
    public getBind(event: string) {
        return this.events.get(event);
    }

    /**
     * 取消监听，如果没有传 callback 或 caller，那么就删除所对应的所有监听
     * @param event
     * @param callback
     * @param caller
     */
    public off(event: string, callback: Func<any>, caller: any) {
        if (!this.events.has(event)) {
            return;
        }
        const events = this.events.get(event);
        for (const item of events) {
            if (item.callback === callback && item.caller === caller) {
                events.delete(item);
                break;
            }
        }
    }
    public offAllCaller(caller: any) {
        for (const events of this.events.values()) {
            for (const item of events) {
                if (item.caller === caller) {
                    events.delete(item);
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
        if (this.events.has(event)) {
            const events = this.events.get(event);
            for (const item of events) {
                const { callback, once, off } = item;
                if (typeof callback === 'function') {
                    callback(...params);
                }
                if (once) {
                    off();
                }
            }
        }
    }
    public destroy() {
        this.events.clear();
    }
}
