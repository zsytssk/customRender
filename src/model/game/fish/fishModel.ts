import { FishSpriteInfo } from 'data/sprite';
import * as SAT from 'sat';
import { DisplaceInfo } from 'utils/displace/displace';
import { BodyCom } from '../com/bodyCom';
import { getShapes } from '../com/bodyComUtil';
import { GameModel } from '../gameModel';
import { ModelEvent } from '../../modelEvent';
import { setProps } from 'utils/utils';
import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { getSpriteInfo } from 'utils/dataUtil';

export const FishEvent = {
    Destroy: ModelEvent.Destroy,
    /** 移动 */
    Move: 'move',
    /** 被网住 */
    BeCast: 'be_cast',
    /** 被捕获 */
    BeCapture: 'be_capture',
    /** 状态改变 */
    StatusChange: 'status_change',
    /** 显示状态改变 */
    VisibleChange: 'visible_change',
};
export type FishMoveData = {
    pos: Point;
    velocity: SAT.Vector;
};

export type FishData = {
    type: string;
    id: string;
    score: number;
    currency: string;
};
/** 鱼的状态 */
export enum FishStatus {
    Normal,
    QuickLeave,
    Freezed,
    Dead,
}
export class FishModel extends ComponentManager {
    /** 唯一标示 */
    public id: string;
    /** 鱼的类型 */
    public type: string;
    /** 位置 */
    public pos: Point;
    /** 方向 */
    public velocity: SAT.Vector;
    /** 鱼的状态 */
    private status = FishStatus.Normal;
    /** 是否水平翻转 */
    public horizon_turn = false;
    /** 移动控制器, */
    private move_com: MoveCom;
    /** 是否显示 */
    public visible = false;
    /** 鱼分 */
    public score: number;
    /** 鱼分 */
    private game: GameModel;
    public event: EventCom;
    public body: BodyCom;
    public currency: string;
    constructor(data: FishData, game: GameModel) {
        super();

        this.game = game;
        this.initCom(data);
    }
    private initCom(data: FishData) {
        const { type, id, score, currency } = data;

        setProps(
            this as FishModel,
            { type, id, score: score || 0, currency } as FishData,
        );
        const sprite_info = getSpriteInfo('fish', type) as FishSpriteInfo;
        let horizon_turn = false;
        if (sprite_info.ani_type === 'horizon_turn') {
            horizon_turn = true;
        }
        const shapes = getShapes('fish', Number(type));
        const body_com = new BodyCom(shapes, horizon_turn);
        const event = new EventCom();
        this.event = event;
        this.body = body_com;
        this.horizon_turn = horizon_turn;
        this.addCom(new EventCom(), body_com);
    }
    public init() {
        const { move_com } = this;
        move_com.start();
    }
    public setMoveCom(move_com: MoveCom) {
        const { move_com: old_move_com } = this;
        if (old_move_com) {
            old_move_com.destroy();
            this.delCom(old_move_com);
        }
        move_com.onUpdate(this.onMoveChange);
        this.move_com = move_com;
        this.addCom(move_com);
    }
    private onMoveChange = (displace_info: DisplaceInfo) => {
        const { body } = this;
        const { pos, velocity, is_complete, visible } = displace_info;
        if (is_complete) {
            return this.destroy();
        }
        this.setVisible(visible);
        if (visible) {
            this.pos = pos;
            this.velocity = velocity;

            body.update(pos, velocity);
            this.event.emit(FishEvent.Move, {
                pos,
                velocity,
            } as MoveInfo);
        }
    }; // tslint:disable-line: semicolon
    /** 被网住 */
    public setStatus(status: FishStatus) {
        if (status === this.status) {
            return;
        }
        this.status = status;
        this.event.emit(FishEvent.StatusChange, status);

        if (status === FishStatus.Freezed) {
            this.move_com.stop();
        } else {
            this.move_com.start();
        }
    }
    public setVisible(visible: boolean) {
        if (visible === this.visible) {
            return;
        }
        this.visible = visible;
        this.event.emit(FishEvent.VisibleChange, visible);
    }
    /** 被网住 */
    public beCast() {
        if (this.event) {
            this.event.emit(FishEvent.BeCast);
        }
    }
    /** 被捉住 */
    public beCapture(): Promise<Point> {
        return new Promise((resolve, reject) => {
            if (this.event) {
                const { pos } = this;
                this.event.emit(FishEvent.BeCapture, () => {
                    resolve(pos);
                    this.destroy();
                });
            } else {
                reject();
                this.destroy();
            }
        });
    }
    public destroy() {
        this.event.emit(FishEvent.Destroy);
        this.setStatus(FishStatus.Dead);
        this.game.removeFish(this);

        this.game = undefined;
        this.id = undefined;
        this.type = undefined;
        this.pos = undefined;
        this.velocity = undefined;
        this.visible = false;
        this.horizon_turn = false;
        this.move_com = undefined;
        this.event = undefined;
        this.body = undefined;
        super.destroy();
    }
}
