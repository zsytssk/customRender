import React, { useState, useEffect } from 'react';
import { Sprite, Skeleton } from 'customRenderer';
import { FishModel, FishEvent } from 'model/game/fish/fishModel';
import { vectorToDegree } from 'utils/mathUtils';

type FishProps = {
    model: FishModel;
};
export function Fish({ model }: FishProps) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const { x, y } = pos;
    const { type, event } = model;
    useEffect(() => {
        event.on(
            FishEvent.Move,
            () => {
                const { pos, velocity, horizon_turn } = model;
                const angle = vectorToDegree(velocity) + 90;
                if (!horizon_turn) {
                    setRotation(angle);
                }
                setPos(pos);
            },
            this,
        );
        return () => {
            event.offAllCaller(this);
        };
    }, []);

    return (
        <Sprite>
            <Skeleton
                x={x}
                y={y}
                rotation={rotation}
                url={`ani/fish/fish${type}.sk`}
            ></Skeleton>
        </Sprite>
    );
}
