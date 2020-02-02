import { Displace, DisplaceInfo } from 'utils/displace/displace';
import { clearTick, createTick } from 'utils/tick';

/** 移动更新函数 */
type MoveUpdateFn = (move_info: DisplaceInfo) => void;

/** 固定路径 移动控制 */
export class MoveDisplaceCom implements MoveCom {
    private displace: Displace;
    private tick_index: number;
    private is_stop = false;
    private update_fn: MoveUpdateFn;
    constructor(displace: Displace) {
        this.displace = displace;
    }
    /** 绑定更新 */
    public onUpdate(update_fn: MoveUpdateFn) {
        this.update_fn = update_fn;
    }
    public start() {
        if (this.tick_index) {
            this.is_stop = false;
            return;
        }
        this.is_stop = false;
        this.tick_index = createTick(this.onTick);
        this.onTick(0);
    }
    private onTick = (t: number) => {
        const { is_stop, update_fn } = this;
        if (is_stop) {
            return;
        }
        const info = this.displace.update(t);
        update_fn(info);
    }; // tslint:disable-line
    public stop() {
        this.is_stop = true;
    }
    public getRadio() {
        return this.displace.radio;
    }
    public destroy() {
        clearTick(this.tick_index);
        this.displace = undefined;
        this.update_fn = undefined;
        this.is_stop = false;
        this.tick_index = 0;
    }
}
