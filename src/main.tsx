import { Laya } from 'laya/Laya';
import React from 'react';
import { CustomRenderer } from './renderer/index';
import { Label } from 'renderer/type';

class App extends React.Component {
    state = {
        text: Date.now(),
    };
    onButtonClick = () => {
        this.setState(() => ({ text: Date.now() }));
    };
    render() {
        return (
            <Label
                text="hello world"
                color="red"
                width={1000}
                align="center"
            ></Label>
        );
    }
}

Laya.init(600, 500);
CustomRenderer.render(<App />, Laya.stage);
