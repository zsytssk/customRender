import React, { Fragment, useContext, useState } from 'react';
import { Hall } from './hall/hall';
import { Game } from './game/game';

export const SceneState = {
    curScene: undefined as string,
    setCurScene: undefined as React.Dispatch<React.SetStateAction<string>>,
};
export function SceneManager() {
    const [cur_scene, setCurScene] = useState('hall');
    let CurScene = <Hall />;
    if (cur_scene === 'game') {
        CurScene = <Game />;
    }
    SceneState.setCurScene = setCurScene;
    SceneState.curScene = cur_scene;
    return <>{CurScene}</>;
}
