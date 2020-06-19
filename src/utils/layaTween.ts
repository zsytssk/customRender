import { Tween } from 'laya/utils/Tween';
import { Ease } from 'laya/utils/Ease';
import { Handler } from 'laya/utils/Handler';

export function tween(duration: number, step: (radio: number) => any) {
    return new Promise((resolve, reject) => {
        const obj = {
            _val: 0,
            get val() {
                return this._val;
            },
            set val(val: number) {
                this._val = val;
                step(val);
            },
        };

        Tween.to(
            obj,
            { val: 1 },
            duration,
            // Ease.circInOut,
            // Ease.cubicInOut,
            // Ease.quartInOut,
            // Ease.quintInOut,
            // Ease.linearInOut,
            Ease.sineInOut,
            Handler.create(null, () => {
                resolve();
            }),
        );
    });
}
