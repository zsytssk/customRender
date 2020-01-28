import { Laya } from 'laya/Laya';
import React from 'react';
import { CustomRenderer } from 'customRenderer';
import { Hall } from 'view/hall/hall';
import { AtlasInfoManager } from 'laya/laya/net/AtlasInfoManager';
import { Handler } from 'laya/laya/utils/Handler';
import { layaInit } from 'layaUtils';

class App extends React.Component {
    render() {
        return <Hall />;
    }
}
layaInit().then(() => {
    CustomRenderer.render(<App />, Laya.stage);
});
