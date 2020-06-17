import { CustomRenderer } from 'customRenderer';
import { Laya } from 'Laya';
import { layaInit } from 'layaUtils';
import React, { Fragment, useEffect } from 'react';
import { PopManager } from 'view/com/popManager';
import { SceneManager } from 'view/com/sceneManager';
import { initAppModel } from 'view/viewState';
import { Hall } from 'view/scene/hall/hall';

function App() {
    useEffect(() => {
        initAppModel();
    }, []);

    return (
        <>
            <SceneManager defScene={Hall} defProps={{ x: 1 }} />
            <PopManager />
        </>
    );
}

layaInit().then(() => {
    CustomRenderer.render(<App />, Laya.stage);
});
