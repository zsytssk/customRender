import { FishStatus } from 'model/game/fish/fishModel';
import { GameModel } from 'model/game/gameModel';
import { ComponentManager } from 'comMan/component';
import { TimeoutCom } from 'comMan/timeoutCom';

export const FreezingComEvent = {
    /** 冰冻 */
    Freezing: 'freezing',
    /** 解除冰冻 */
    UnFreezing: 'un_freezing',
};

/** 冰冻处理逻辑 */
export class GameFreezeCom extends ComponentManager {
    private game: GameModel;
    private freezing_timeout: number;
    constructor(game: GameModel) {
        super();
        this.game = game;

        this.addCom(new TimeoutCom());
    }
    /** 冰冻 */
    public freezing(cool_time: number, fish_list: string[]) {
        const { game, freezing_timeout } = this;
        const { event } = game;
        const timeout = this.getCom(TimeoutCom);
        if (freezing_timeout) {
            timeout.clear(freezing_timeout);
        }
        this.freezing_timeout = timeout.createTimeout(() => {
            this.unFreezing();
        }, cool_time * 1000);

        for (const fish_id of fish_list) {
            const fish = game.getFishById(fish_id);
            if (!fish) {
                continue;
            }
            fish.setStatus(FishStatus.Freezed);
        }
        event.emit(FreezingComEvent.Freezing);
    }
    /** 解除冰冻 */
    public unFreezing() {
        const { game, freezing_timeout } = this;
        const { fish_list, event } = game;
        const timeout = this.getCom(TimeoutCom);
        if (freezing_timeout) {
            timeout.clear(freezing_timeout);
        }
        for (const fish of fish_list) {
            fish.setStatus(FishStatus.Normal);
        }
        event.emit(FreezingComEvent.UnFreezing);
    }
}
