import { CustomRenderer } from 'customRenderer';
import { Laya } from 'laya/Laya';
import { layaInit } from 'layaUtils';
import React, { Fragment } from 'react';
import { Hall } from 'view/scene/hall/hall';
import { usePopContext } from 'view/pop/popContext';
import { PopManager } from 'view/pop/popManager';
import { Game } from 'view/scene/game/game';
import { useSceneContext } from 'view/scene/sceneContext';
import { SceneManager } from 'view/scene/sceneManager';

function App() {
    const { PopContext, pop_list } = usePopContext();
    const { SceneContext, cur_scene } = useSceneContext();
    return (
        <Fragment>
            <SceneContext.Provider value={cur_scene}>
                <SceneManager></SceneManager>
            </SceneContext.Provider>

            <PopContext.Provider value={{ pop_list }}>
                <PopManager />
            </PopContext.Provider>
        </Fragment>
    );
}

layaInit().then(() => {
    CustomRenderer.render(<App />, Laya.stage);
});
