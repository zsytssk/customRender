import React, { useEffect, useState } from 'react';
import { View } from 'customRenderer';
import { Laya } from 'Laya';

export function Scene(props: ComProps) {
    const { children } = props;
    const [x, setX] = useState(0);

    useEffect(() => {
        const setXFn = () => {
            const { width } = Laya.stage;
            const x = (width - 1920) / 2;
            setX(x);
        };
        Laya.stage.on(Laya.Event.RESIZE, this, setXFn);
        setXFn();

        return () => {
            Laya.stage.off(Laya.Event.RESIZE, this, setXFn);
        };
    }, []);

    return (
        <View x={x} width={1920} height={750} autoDestroyAtClosed={true}>
            {...children}
        </View>
    );
}
