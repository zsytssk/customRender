import React, { useRef, useEffect, useContext } from 'react';
import { PopInfo, state } from './popContext';
import { Box, Sprite } from 'customRenderer';
import { Sprite as LayaSprite } from 'laya/laya/display/Sprite';
import { Laya } from 'laya/Laya';

export type PopProps = PopInfo;
export const PopManager = () => {
    const { PopContext } = state;
    const { pop_list } = useContext(PopContext);
    const maskRef = useRef(null as LayaSprite);

    useEffect(() => {
        const mask_layer = maskRef.current;
        const stage = Laya.stage;
        if (mask_layer) {
            mask_layer.alpha = 0.5;
            mask_layer.graphics.drawRect(
                0,
                0,
                stage.width,
                stage.height,
                'black',
            );
        }
    }, []);

    const show_arr = [] as JSX.Element[];
    for (const item of pop_list) {
        const { Ele, isShow } = item;
        const props = {
            ...item,
        };
        if (isShow) {
            show_arr.push(<Ele {...props} key={Ele}></Ele>);
        }
    }
    if (show_arr.length) {
        show_arr.splice(
            show_arr.length - 2,
            0,
            <Sprite
                key="maskLayer"
                ref={maskRef as any}
                name="maskLayer"
            ></Sprite>,
        );
    }

    return <Box key="pop_wrap">{...show_arr}</Box>;
};
