import { isFunc } from './utils';

/**
 * 后台检测控制器
 * 核心代码来之张笑的 laya.tool.js, 在他的基础上添加一些功能
 */
export class BackgroundMonitor {
    /** 用来通过计算window.
     * setInterval缓慢执行的时间差,
     * 来确定用户离开页面的Interval
     */
    private interval: number;
    private bind_fns: FuncVoid[] = [];
    private time_zone: number;
    private bind_visibility_change_fn: EventListener;
    private time_out: number;
    constructor(time_zone?: number) {
        this.time_zone = time_zone || 1000;
    }
    public bindEnterBackground(fn: FuncVoid) {
        if (isFunc(fn)) {
            this.bind_fns.push(fn);
        }
    }
    private runBindFun() {
        for (const fn of this.bind_fns) {
            fn();
        }
    }
    public enableMonitor() {
        /** 测试环境禁用后台功能 */
        if (document?.visibilityState) {
            const bind_visibility_change_fn: EventListener = this.visibilityChange.bind(
                this,
            );

            // 在浏览器中判断页面是否被隐藏
            document.addEventListener(
                'visibilitychange',
                bind_visibility_change_fn,
            );
            this.bind_visibility_change_fn = bind_visibility_change_fn;
        }

        // old browser 的处理函数
        const Browser = laya.utils.Browser;
        let last_time = Browser.now();
        const diff_time = this.time_zone;

        if (!Browser.onAndroid) {
            this.interval = window.setInterval(() => {
                const now_time = Browser.now();
                if (now_time - last_time > diff_time) {
                    clearInterval(this.interval);
                    this.runBindFun();
                }

                last_time = now_time;
            }, 300);
        } else {
            let _counter = 0;
            this.interval = window.setInterval(() => {
                const now_time = Browser.now();

                if (now_time - last_time > diff_time) {
                    if (_counter > 1) {
                        clearInterval(this.interval);
                        this.runBindFun();
                    } else {
                        _counter += 1;
                    }
                }

                last_time = now_time;
            }, 300);
        }
    }
    /** 浏览器的visibilityState发生变化的处理函数 */
    private visibilityChange() {
        const visibilityState = document.visibilityState;
        if (visibilityState === 'hidden') {
            this.time_out = window.setTimeout(() => {
                this.runBindFun();
            }, this.time_zone);
        }
        if (visibilityState === 'visible') {
            if (this.time_out) {
                clearTimeout(this.time_out);
            }
        }
    }
    /** 禁用监控 */
    public disabledMonitor() {
        clearInterval(this.interval);

        if (document && document.visibilityState) {
            document.removeEventListener(
                'visibilitychange',
                this.bind_visibility_change_fn,
            );
        }
    }
}
