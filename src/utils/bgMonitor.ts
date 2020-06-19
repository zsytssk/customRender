import { Laya } from 'Laya';
import { EventCom } from 'comMan/eventCom';

export const BgMonitorEvent = {
    VisibleChange: 'VisibleChange',
};
/**
 * 后台检测控制器
 * 核心代码来之张笑的 laya.tool.js, 在他的基础上添加一些功能
 */
export class BgMonitor {
    /** 用来通过计算window.
     * setInterval缓慢执行的时间差,
     * 来确定用户离开页面的Interval
     */
    private interval: number;
    public event = new EventCom();
    constructor() {
        this.init();
    }
    public init() {
        /** 测试环境禁用后台功能 */
        if (document?.visibilityState) {
            // 在浏览器中判断页面是否被隐藏
            return document.addEventListener(
                'visibilitychange',
                this.visibilityChange,
            );
        }

        // old browser 的处理函数
        const Browser = Laya.Browser;
        let last_time = Browser.now();
        const diff_time = 1000;

        if (!Browser.onAndroid) {
            this.interval = window.setInterval(() => {
                const now_time = Browser.now();
                if (now_time - last_time > diff_time) {
                    clearInterval(this.interval);
                    this.emitEvent(false);
                }

                last_time = now_time;
            }, 300);
            return;
        }

        let _counter = 0;
        this.interval = window.setInterval(() => {
            const now_time = Browser.now();

            if (now_time - last_time > diff_time) {
                if (_counter > 1) {
                    clearInterval(this.interval);
                    this.emitEvent(false);
                } else {
                    _counter += 1;
                }
            }

            last_time = now_time;
        }, 300);
    }
    private emitEvent(status: boolean) {
        this.event.emit(BgMonitorEvent.VisibleChange, status);
    }
    /** 浏览器的visibilityState发生变化的处理函数 */
    private visibilityChange = () => {
        const visibilityState = document.visibilityState;
        if (visibilityState === 'hidden') {
            this.emitEvent(false);
        }
        if (visibilityState === 'visible') {
            this.emitEvent(true);
        }
    }; // tslint:disable-line
}
