type Range = [number, number];

export type PaginationItem =
    | 'prev'
    | 'next'
    | 'left_spread'
    | 'right_spread'
    | number;
export class Pagination {
    /** item数目 */
    public item_total_num: number;
    /** 一页有多少item */
    public item_page_num: number;
    /** i当前页 item 的范围 */
    public item_range: Range;
    /** page数目 */
    public page_num: number;
    /** 当前分页 */
    public cur_page: number;
    /** 可以向前 */
    public has_prev: boolean;
    /** 可以向后 */
    public has_next: boolean;
    /** pagination 的大小 */
    public pagination_num: number;
    /** pagination 范围 */
    public pagination_range: Range;
    /** pagination 有左 spread */
    public has_left_spread: boolean;
    /** pagination 有右 spread */
    public has_right_spread: boolean;
    public updateData(total: number, page_size: number, pagination_num = 3) {
        if (
            total === this.item_total_num &&
            this.item_page_num === page_size &&
            this.pagination_num === pagination_num
        ) {
            return;
        }
        this.item_total_num = total;
        this.item_page_num = page_size;
        this.pagination_num = pagination_num;
        this.cur_page = 0;
        this.analyse();
    }
    public reset() {
        this.item_total_num = 0;
        this.item_page_num = 0;
        this.pagination_num = 0;
        this.cur_page = 0;
    }
    public next() {
        const { has_next } = this;
        if (!has_next) {
            return;
        }
        this.cur_page += 1;
        this.analyse();
    }
    public prev() {
        const { has_prev } = this;
        if (!has_prev) {
            return;
        }
        this.cur_page -= 1;
        this.analyse();
    }
    public setCurPage(cur_page: number) {
        if (cur_page < 0) {
            cur_page = 0;
        }
        if (cur_page > this.page_num - 1) {
            cur_page = this.page_num - 1;
        }
        this.cur_page = cur_page;
        this.analyse();
    }
    public rightSpread() {
        const { has_right_spread } = this;
        if (!has_right_spread) {
            return;
        }
        let cur_page = this.cur_page + this.pagination_num;
        if (cur_page > this.page_num - 1) {
            cur_page = this.page_num - 1;
        }
        this.cur_page = cur_page;
        this.analyse();
    }
    public leftSpread() {
        const { has_left_spread } = this;
        if (!has_left_spread) {
            return;
        }
        let cur_page = this.cur_page - this.pagination_num;
        if (cur_page < 0) {
            cur_page = 0;
        }
        this.cur_page = cur_page;
        this.analyse();
    }
    private analyse() {
        const {
            item_total_num,
            item_page_num,
            cur_page,
            pagination_num,
        } = this;
        const page_num = Math.ceil(item_total_num / item_page_num);
        this.page_num = page_num;

        const item_range_start = cur_page * item_page_num;
        let item_range_end = (cur_page + 1) * item_page_num;
        if (item_range_end > item_total_num) {
            item_range_end = item_total_num;
        }

        /** 当前页的item范围 */
        const item_range: Range = [item_range_start, item_range_end];
        this.item_range = item_range;

        const has_prev = cur_page > 0;
        const has_next = cur_page < page_num - 1;
        this.has_prev = has_prev;
        this.has_next = has_next;

        const start_space = Math.ceil((pagination_num - 1) / 2);
        let pagination_range_start = cur_page - start_space;
        if (pagination_range_start < 0) {
            pagination_range_start = 0;
        }
        let pagination_range_end = pagination_range_start + pagination_num;
        if (pagination_range_end > page_num) {
            pagination_range_end = page_num;
            pagination_range_start = pagination_range_end - pagination_num;
            if (pagination_range_start < 0) {
                pagination_range_start = 0;
            }
        }
        const pagination_range: Range = [
            pagination_range_start,
            pagination_range_end,
        ];
        this.pagination_range = pagination_range;

        const has_left_spread = pagination_range_start > 1;
        const has_right_Spread = pagination_range_end < page_num - 1;

        this.has_left_spread = has_left_spread;
        this.has_right_spread = has_right_Spread;
    }
    public output() {
        const {
            cur_page,
            item_range,
            has_next,
            has_prev,
            pagination_range,
            has_left_spread,
            has_right_spread,
            page_num,
        } = this;

        const pagination_arr = [] as PaginationItem[];
        pagination_arr.push('prev');
        if (pagination_range[0] > 0) {
            pagination_arr.push(0);
        }
        if (has_left_spread) {
            pagination_arr.push('left_spread');
        }
        if (pagination_range) {
            for (let i = pagination_range[0]; i < pagination_range[1]; i++) {
                pagination_arr.push(i);
            }
        }
        if (has_right_spread) {
            pagination_arr.push('right_spread');
        }
        if (pagination_range[1] < page_num) {
            pagination_arr.push(page_num - 1);
        }
        pagination_arr.push('next');
        return {
            cur_page,
            item_range,
            has_next,
            has_prev,
            pagination_arr,
            pagination_range,
            page_num,
        };
    }
}
