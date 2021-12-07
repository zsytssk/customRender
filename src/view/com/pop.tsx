import React, { useEffect, useState } from 'react';
import { View } from 'customRenderer';
import { Laya } from 'Laya';

type PopProps = {
    width: number;
    height: number;
    visible: boolean;
};
export function Pop(props: ComProps & PopProps) {
    let { children } = props;
    const { width, height } = props;
    const { visible: isShow } = props;
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const setXFn = () => {
            const { width: stage_width, height: stage_height } = Laya.stage;
            const x = (stage_width - width) / 2;
            const y = (stage_height - height) / 2;
            setX(x);
            setY(y);
        };
        Laya.stage.on(Laya.Event.RESIZE, this, setXFn);
        setXFn();
        setVisible(isShow);

        return () => {
            Laya.stage.off(Laya.Event.RESIZE, this, setXFn);
        };
    }, []);

    return (
        <View x={x} y={y} width={width} height={height} visible={visible}>
            {...children}
        </View>
    );
}
