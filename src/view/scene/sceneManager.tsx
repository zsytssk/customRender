import React, { Fragment, useContext } from 'react';
import { Hall } from './hall/hall';
import { Game } from './game/game';
import { state } from './sceneContext';

export function SceneManager() {
    const { SceneContext } = state;
    const cur_scene = useContext(SceneContext);
    let CurScene = <Hall />;
    if (cur_scene === 'game') {
        CurScene = <Game />;
    }

    return <Fragment>{CurScene}</Fragment>;
}
