import { Box } from 'customRenderer';
import React, { useEffect, useState } from 'react';
import { getGameModel } from 'model/modelState';
import { GameEvent } from 'model/game/gameModel';
import { FishModel } from 'model/game/fish/fishModel';
import { Fish } from './fish';

export function Pool() {
    const game_model = getGameModel();
    const [fish_list, setFishList] = useState(new Set() as Set<FishModel>);
    useEffect(() => {
        const { event } = game_model;
        event.on(
            GameEvent.AddFish,
            (fish: FishModel) => {
                fish_list.add(fish);
                setFishList(new Set([...fish_list]));
            },
            this,
        );
        return () => {
            event.offAllCaller(this);
        };
    }, []);

    const fish_view_list = [] as JSX.Element[];
    for (const fish of fish_list) {
        if (fish.destroyed) {
            continue;
        }
        console.log(`fish:>`, fish.id);
        fish_view_list.push(<Fish model={fish} key={fish.id}></Fish>);
    }
    return (
        <Box width={1920} height={750}>
            {...fish_view_list}
        </Box>
    );
}
