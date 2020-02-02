import { Component } from './component';

type TimeoutFn = () => void;
export class TimeoutCom implements Component {
    private timeout_list: Set<number> = new Set();
    private interval_list: Set<number> = new Set();
    public createTimeout(fn: TimeoutFn, time?: number) {
        const timeout: number = setTimeout(() => {
            fn();
            this.timeout_list.delete(timeout);
        }, time) as any;
        this.timeout_list.add(timeout);
        return timeout;
    }
    public createInterval(fn: TimeoutFn, time: number) {
        const timeout: number = setInterval(() => {
            fn();
            this.interval_list.delete(timeout);
        }, time) as any;
        this.interval_list.add(timeout);
        return timeout;
    }
    public clear(timeout: number) {
        const { timeout_list, interval_list } = this;
        if (timeout_list.has(timeout)) {
            timeout_list.delete(timeout);
            clearTimeout(timeout);
        }
        if (interval_list.has(timeout)) {
            interval_list.delete(timeout);
            clearInterval(timeout);
        }
    }
    public destroy() {
        const { timeout_list, interval_list } = this;

        for (const timeout of timeout_list) {
            clearTimeout(timeout);
        }
        for (const interval of interval_list) {
            clearInterval(interval);
        }
        timeout_list.clear();
        interval_list.clear();
    }
}
