import { SkillMap } from 'data/config';
import { AutoShootModel } from './autoShootModel';
import { BombModel } from './bombModel';
import { FreezeModel } from './freezeModel';
import { SkillCoreCom } from './skillCoreCom';
import { LockFishModel } from './lockFishModel';

/** 技能的接口 */
export interface SkillModel {
    skill_core: SkillCoreCom;
    init(): void;
    active(info: any): void;
    reset(): void;
    disable(): void;
    destroy(): void;
}

/** 技能的树... */
export const SkillCtorMap = {
    [SkillMap.Freezing]: FreezeModel,
    [SkillMap.Bomb]: BombModel,
    [SkillMap.LockFish]: LockFishModel,
    [SkillMap.Auto]: AutoShootModel,
};
