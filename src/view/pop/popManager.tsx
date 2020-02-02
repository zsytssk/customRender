import { Box, Sprite } from 'customRenderer';
import { Laya } from 'laya/Laya';
import { Sprite as LayaSprite } from 'laya/laya/display/Sprite';
import React, { useEffect, useRef, useState } from 'react';
import { genRandomStr } from 'utils/utils';
import { Alert } from './alert';

export type PopInfo = {
    Ele: (...args: any[]) => JSX.Element;
    args: any[];
    isShow: boolean;
    id: string;
};
export type PopProps = PopInfo;
type PopList = Set<PopInfo>;
type ShowPop = (Ele: (...args: any[]) => JSX.Element, ...args: any[]) => void;
type HidePop = (id: string) => void;
export const PopState = {
    showPop: undefined as ShowPop,
    hidePop: undefined as HidePop,
    alert() {
        const id = genRandomStr();
        PopState.showPop(Alert, `this is a test! ${id}`);
    },
};
(window as any).test = PopState;
export const PopManager = () => {
    const [pop_list, setPopList] = useState(new Set() as PopList);
    const maskRef = useRef(null as LayaSprite);

    const showPop = (...params: Parameters<ShowPop>) => {
        const [Ele, ...args] = params;
        let find_item = false;
        for (const item of pop_list) {
            if (item.Ele === Ele) {
                find_item = true;
                item.isShow = true;
                item.args = args;
            }
        }
        if (!find_item) {
            const id = genRandomStr();
            pop_list.add({
                isShow: true,
                Ele,
                args,
                id,
            });
        }
        setPopList(new Set([...pop_list]));
    };
    const hidePop = (id: string) => {
        for (const item of pop_list) {
            if (item.id === id) {
                item.isShow = false;
            }
        }
        setPopList(new Set([...pop_list]));
    };

    PopState.showPop = showPop;
    PopState.hidePop = hidePop;

    useEffect(() => {
        const mask_layer = maskRef.current;
        const resizeMask = () => {
            const { width, height } = Laya.stage;
            if (mask_layer) {
                mask_layer.alpha = 0.5;
                mask_layer.graphics.clear();
                mask_layer.graphics.drawRect(0, 0, width, height, 'black');
            }
        };
        Laya.stage.on(Laya.Event.RESIZE, this, resizeMask);
        resizeMask();

        return () => {
            Laya.stage.off(Laya.Event.RESIZE, this, resizeMask);
        };
    });

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
