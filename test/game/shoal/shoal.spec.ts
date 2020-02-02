import { modelState } from 'model/modelState';
import { Test } from 'testBuilder';
import { genRandomStr } from 'utils/utils';
import * as Shoal1Data from './shoal1.json';
import * as Shoal2Data from './shoal2.json';
import * as Shoal3Data from './shoal3.json';

export const shoal_test = new Test('shoal', runner => {
    runner.describe('add_shoal1', () => {
        addShoal(Shoal1Data);
    });
    runner.describe('add_shoal2', () => {
        addShoal(Shoal2Data);
    });
    runner.describe('add_shoal3', () => {
        addShoal(Shoal3Data);
    });
});

function addShoal(data: typeof Shoal1Data) {
    const total_time = 100000;
    const { fish } = data;
    for (const fish_item of fish) {
        const {
            startTimeRadio,
            endTimeRadio,
            fishId,
            displaceType,
            ...other
        } = fish_item;
        const totalTime = (endTimeRadio - startTimeRadio) * total_time;
        const usedTime = -startTimeRadio * total_time;

        modelState.app.game.addFish({
            eid: genRandomStr(),
            totalTime,
            usedTime,
            displaceType: displaceType as displaceType,
            fishId: fishId + '',
            ...other,
        });
    }
}
