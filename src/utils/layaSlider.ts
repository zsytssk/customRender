import { Box } from 'laya/ui/Box';
import { Tab } from 'laya/ui/Tab';
import { Rectangle } from 'laya/maths/Rectangle';
import { Event } from 'laya/events/Event';
import { Handler } from 'laya/utils/Handler';
import { ViewStack } from 'laya/ui/ViewStack';
import { Sprite } from 'laya/display/Sprite';
import { Tween } from 'laya/utils/Tween';

const default_config = {
    origin_index: 0, // 初始显示的index
    animate_time: 500, // 动画执行时间
    item_space: 10, // item 之间的距离
    move_scope_rate: 1 / 6,
    pagination: true, // false | true || dom
    loop: true, // false | true || dom
    end_call_back: null, // 移动完成执行函数 @para index
};
type Opt = typeof default_config & {
    item_width: number;
    end_call_back: () => void;
};
type Config = {
    cur_index: number;
    origin_index: number;
    item_space: number;
    animate_time: number;
    pagination: boolean;
    loop: boolean;
    move_space: number;
    move_scope: number;
    end_call_back: (index: number) => void;
};
type Dom = {
    pagination: Tab;
    glr: Box;
    con: Box;
    list: Box;
    items: Box[];
};
type Tmp = {
    start_point: Point;
    origin_pos: Partial<Point>;
    move_dist: Point;
    next_show_index: number;
    move_direction: string;
};
type NewList = Box & {
    space: number;
};
type Dir = 'left' | 'right';
export class LayaSlider {
    private dom = {} as Dom;
    private config = {} as Config;
    private tmp = {} as Tmp;
    private touch_status: string = 'end';
    constructor(dom: Box, options?: Opt) {
        this.dom.glr = dom;
        this.initConfig(options);
        this.init();
    }
    public next() {
        const { touch_status } = this;
        if (touch_status !== 'end') {
            return;
        }
        const move_direction = 'right';
        this.detectNextShowIndex(move_direction);
        this.animateMove();
    }
    public prev() {
        const { touch_status } = this;
        if (touch_status !== 'end') {
            return;
        }
        const move_direction = 'left';
        this.detectNextShowIndex(move_direction);
        this.animateMove(false);
    }
    public goto(index: number) {
        const { touch_status } = this;
        if (touch_status !== 'end') {
            return;
        }
        this.tmp.next_show_index = index;
        this.animateMove(false);
    }
    /** 初始化配置 */
    private initConfig(options = {} as Opt) {
        this.config.cur_index =
            options.origin_index || default_config.origin_index;
        this.config.item_space =
            options.item_space || default_config.item_space;
        this.config.animate_time =
            options.animate_time || default_config.animate_time;
        this.config.pagination = options.hasOwnProperty('pagination')
            ? options.pagination
            : default_config.pagination;
        if (options.hasOwnProperty('loop')) {
            this.config.loop = options.loop;
        } else {
            this.config.loop = default_config.loop;
        }
        this.config.end_call_back =
            options.end_call_back || default_config.end_call_back;

        // 每次移动的距离
        if (options.item_width) {
            this.config.move_space =
                options.item_width + this.config.item_space;
            // 每次移动超过这个阈值 才会移动到上一个或者下一个, 不然只是移动到原来的位置
            this.config.move_scope =
                this.config.move_space * default_config.move_scope_rate;
        }
    }
    private init() {
        this.initDom();
        this.initEvent();

        // 如果option中没有设置item_width, 就根据当前的宽度计算 应该移动的位移
        if (!this.config.move_space) {
            this.config.move_space =
                this.dom.con.width + this.config.item_space;
            this.config.move_scope =
                this.config.move_space * default_config.move_scope_rate;
        }
    }
    private initEvent() {
        const { list: dom_list } = this.dom;
        const { MOUSE_DOWN, MOUSE_MOVE, MOUSE_UP, MOUSE_OUT } = Event;

        if (this.config.pagination) {
            this.dom.pagination.selectHandler = Handler.create(
                this,
                this.paginationHandler,
                null,
                false,
            );
        }

        dom_list.on(MOUSE_DOWN, this, this.onTouchStart);
        dom_list.on(MOUSE_MOVE, this, this.onTouchMove);
        dom_list.on(MOUSE_UP, this, this.onTouchEnd);
        dom_list.on(MOUSE_OUT, this, this.onTouchEnd);
    }
    private initDom() {
        const { glr } = this.dom;

        this.dom.con = glr.getChildByName('con') as Box;
        this.dom.list = this.dom.con.getChildByName('list') as ViewStack;
        this.replaceGlrList();
        this.addMask();

        this.dom.items = [];
        for (let i = 0; i < this.dom.list.numChildren; i++) {
            this.dom.items.push(this.dom.list.getChildAt(i) as Box);
        }
        const pagination = this.config.pagination;
        if (pagination) {
            if (typeof pagination === 'boolean') {
                this.dom.pagination = glr.getChildByName('pagination') as Tab;
            } else {
                this.dom.pagination = pagination;
            }
        }
    }
    private addMask() {
        const { con } = this.dom;
        con.scrollRect = new Rectangle(0, 0, con.width, con.height);
    }
    private replaceGlrList() {
        const { con, list: dom_list } = this.dom;

        const new_list = new Box() as NewList;

        new_list.name = 'list';
        const arr_items = [];
        /*
            将list添加在数组中, 然后在添加到新的list中
            保证新的list中保持原有的顺序
        */
        for (let i = 0; i < dom_list.numChildren; i++) {
            const dom_item = dom_list.getChildAt(i) as Sprite;
            dom_item.name = 'item';
            dom_item.visible = true;
            arr_items.push(dom_item);
        }

        for (let i = 0; i < arr_items.length; i++) {
            if (i === default_config.origin_index) {
                arr_items[i].visible = true;
            } else {
                arr_items[i].visible = false;
            }
            new_list.addChild(arr_items[i]);
        }
        this.dom.list = new_list;
        con.addChild(new_list);
        new_list.space = default_config.item_space;
        new_list.cacheAs = 'none';
        new_list.x = dom_list.x;
        new_list.y = dom_list.y;

        // 删除原有的list
        con.removeChild(dom_list);
        dom_list.destroy();
    }
    private paginationHandler(index: number, ani: boolean) {
        if (this.touch_status === 'onEndAnimate') {
            // 正在touchEnd动画时候不做处理
            return true;
        }
        // 如果用户点击pagination而不是滑动触发, 要移动list
        const { cur_index } = this.config;
        let move_direction: Dir;
        if (cur_index > index) {
            move_direction = 'left';
        } else {
            move_direction = 'right';
        }
        this.handleMoveEffect(move_direction, index);
        this.animateMove(ani);
    }
    private onTouchStart(event: Event) {
        const { list: dom_list } = this.dom;
        if (this.touch_status === 'onEndAnimate') {
            // 正在touchEnd动画时候不做处理
            return true;
        }
        this.tmp.start_point = {
            x: event.stageX,
            y: event.stageY,
        };
        this.tmp.origin_pos = {
            x: dom_list.x,
        };
        this.touch_status = 'start';
    }
    private onTouchMove(event: Event) {
        const { touch_status } = this;
        const dom_list = this.dom.list;
        if (touch_status !== 'start' && touch_status !== 'move') {
            return true;
        }

        if (touch_status === 'start') {
            this.touch_status = 'move';
        }
        this.tmp.move_dist = {
            x: event.stageX - this.tmp.start_point.x,
            y: event.stageY - this.tmp.start_point.y,
        };
        dom_list.x = this.tmp.origin_pos.x + this.tmp.move_dist.x;
        this.detectMoveDirection(this.tmp.move_dist.x);
    }
    private detectMoveDirection(move_x: number) {
        const loop = this.config.loop;
        const len = this.dom.items.length;
        const { cur_index } = this.config;
        let move_direction: Dir;
        if (move_x > 0) {
            move_direction = 'left';
        } else if (move_x < 0) {
            move_direction = 'right';
        } else {
            // 没有移动不做处理
            this.tmp.next_show_index = cur_index;
            return true;
        }

        if (!loop) {
            if (
                (cur_index === 0 && move_direction === 'left') ||
                (cur_index === len - 1 && move_direction === 'right')
            ) {
                return;
            }
        }
        this.detectNextShowIndex(move_direction);
    }
    private detectNextShowIndex(move_direction: Dir) {
        const { cur_index } = this.config;
        const dom_items = this.dom.items;
        const items_num = dom_items.length;
        let next_show_index;

        if (move_direction === 'left') {
            next_show_index = cur_index - 1;
        } else {
            next_show_index = cur_index + 1;
        }

        if (next_show_index < 0) {
            next_show_index = items_num - 1;
        } else if (next_show_index >= items_num) {
            next_show_index = 0;
        }
        this.handleMoveEffect(move_direction, next_show_index);
    }
    private handleMoveEffect(move_direction: Dir, next_show_index: number) {
        const { cur_index, move_space } = this.config;
        const dom_items = this.dom.items;
        if (
            move_direction === this.tmp.move_direction &&
            next_show_index === this.tmp.next_show_index
        ) {
            return true;
        }
        this.tmp.move_direction = move_direction;
        this.tmp.next_show_index = next_show_index;

        for (let i = 0; i < dom_items.length; i++) {
            if (i === cur_index || i === next_show_index) {
                continue;
            }
            dom_items[i].x = 0;
            dom_items[i].visible = false;
        }

        const dom_next_show = dom_items[next_show_index];
        dom_next_show.visible = true;
        if (move_direction === 'left') {
            dom_next_show.x = -move_space;
        } else {
            dom_next_show.x = move_space;
        }
    }
    private onTouchEnd() {
        let move_dist = this.tmp?.move_dist?.x;

        // 正在touchEnd动画时候不做处理
        if (this.touch_status === 'onEndAnimate') {
            return true;
        }
        if (this.touch_status !== 'move' || !move_dist) {
            this.reset();
            return true;
        }

        move_dist = this.tmp.move_dist.x;
        if (Math.abs(move_dist) < this.config.move_scope) {
            this.tmp.next_show_index = this.config.cur_index;
        }

        if (this.tmp.next_show_index === undefined) {
            this.tmp.next_show_index = this.config.cur_index;
        }
        this.animateMove();
    }

    // 滑动结束 滚动最终的位置动画
    private animateMove(ani?: boolean) {
        const end_call_back = this.config.end_call_back;
        const next_show_index = this.tmp.next_show_index;
        let move_space = this.config.move_space;

        this.touch_status = 'onEndAnimate';

        if (this.config.cur_index === next_show_index) {
            // 如果两者相等 移动的距离为0
            move_space = 0;
        } else {
            this.config.cur_index = next_show_index;
            if (this.tmp.move_direction === 'right') {
                move_space = -move_space;
            }
        }

        const dom_list = this.dom.list;
        const changeProper = {
            x: move_space,
        };

        if (ani === false) {
            dom_list.x = move_space;
            callLater.call(this);
        } else {
            Tween.to(
                dom_list,
                changeProper,
                this.config.animate_time,
                null,
                Handler.create(this, callLater),
            );
        }

        function callLater() {
            if (this.config.pagination) {
                this.dom.pagination.selectedIndex = this.config.cur_index; // pagination的处理
            }
            if (end_call_back && typeof end_call_back === 'function') {
                end_call_back(this.config.cur_index);
            }
            this.reset();
        }
    }
    // 重置游戏
    private reset() {
        this.resetGlrCon();
        this.tmp = {} as Tmp;
        this.touch_status = 'end';
    }

    // 滚动结束之后, reset所有的item
    private resetGlrCon() {
        const { list: dom_list, items: dom_items } = this.dom;
        const { cur_index } = this.config;

        // 将list回到原点, 当前显示的item
        dom_list.x = 0;
        dom_items[cur_index].x = 0;

        for (let i = 0; i < dom_items.length; i++) {
            if (i !== this.config.cur_index) {
                dom_items[i].visible = false;
                continue;
            }
            dom_items[i].visible = true;
            dom_items[i].x = 0; // 将节点的位置设置为0
        }
    }
}
