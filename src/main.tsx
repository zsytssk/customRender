import { CustomRenderer } from 'customRenderer';
import { Laya } from 'laya/Laya';
import { layaInit } from 'layaUtils';
import React, { Fragment } from 'react';
import { PopManager } from 'view/pop/popManager';
import { SceneManager } from 'view/scene/sceneManager';
import { initAppModel } from 'view/viewState';

function App() {
    initAppModel();
    return (
        <>
            <SceneManager />
            <PopManager />
        </>
    );
}

layaInit().then(() => {
    CustomRenderer.render(<App />, Laya.stage);
});
