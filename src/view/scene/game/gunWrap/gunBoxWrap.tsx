import { View } from 'customRenderer';
import { PlayerModel } from 'model/game/playerModel';
import { getGameModel } from 'model/modelState';
import React, { useEffect, useState } from 'react';
import { GameEvent } from 'model/game/gameModel';
import { GunBox } from './gunBox';

export function GunWrap() {
    const game_model = getGameModel();
    const [player_list, setPlayerList] = useState(
        new Set() as Set<PlayerModel>,
    );
    useEffect(() => {
        const { event } = game_model;
        event.on(
            GameEvent.AddPlayer,
            (player: PlayerModel) => {
                player_list.add(player);
                setPlayerList(new Set([...player_list]));
            },
            this,
        );
        return () => {
            event.offAllCaller(this);
        };
    }, []);

    const view_list = [] as JSX.Element[];
    for (const player of player_list) {
        if (player.destroyed) {
            continue;
        }
        view_list.push(<GunBox model={player} key={player.user_id} />);
    }

    return (
        <View width={1920} height={750}>
            {...view_list}
        </View>
    );
}
