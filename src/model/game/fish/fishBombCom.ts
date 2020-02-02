import { FishModel } from './fishModel';
import { getBeBombFish } from './fishModelUtils';
export const FishBombEvent = {
    FishBomb: 'fish_bomb',
};
export type FishBombInfo = {
    pos: Point;
    fish_list?: string[];
    need_emit?: boolean;
};
export class FishBombCom {
    private fish: FishModel;
    constructor(fish: FishModel) {
        this.fish = fish;
    }
    public active(need_emit = false) {
        const { fish } = this;
        const { pos, id } = fish;
        const data = {
            pos,
            need_emit,
        } as FishBombInfo;
        if (need_emit) {
            data.fish_list = getBeBombFish(pos).filter(item => {
                return item !== id;
            });
        }
        fish.event.emit(FishBombEvent.FishBomb, data);
    }
    public destroy() {
        this.fish.event?.offAllCaller(this);
        this.fish = undefined;
    }
}
