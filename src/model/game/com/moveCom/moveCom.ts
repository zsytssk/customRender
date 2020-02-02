interface MoveInfo {
    pos?: Point;
    velocity?: SAT.Vector;
}
interface MoveCom {
    /** 更新位置 */
    onUpdate(move_fn: MoveUpdateFn): void;
    start(): void;
    stop(): void;
    destroy(): void;
    getRadio?(): number;
}

type MoveUpdateFn = (move_info: MoveInfo) => void;
