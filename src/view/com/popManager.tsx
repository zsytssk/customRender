import { Box, Sprite } from 'customRenderer';
import { Laya } from 'Laya';
import { Sprite as LayaSprite } from 'laya/display/Sprite';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { genRandomStr } from 'utils/utils';

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
};
(window as any).test = PopState;

export function PopManager() {
    const [pop_list, setPopList] = useState(new Set() as PopList);
    const maskRef = useRef(null as LayaSprite);

    const showPop = useCallback(
        (...params: Parameters<ShowPop>) => {
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
        },
        [pop_list],
    );

    const hidePop = useCallback(
        (id: string) => {
            for (const item of pop_list) {
                if (item.id === id) {
                    item.isShow = false;
                }
            }
            setPopList(new Set([...pop_list]));
        },
        [pop_list],
    );

    useEffect(() => {
        PopState.showPop = showPop;
        PopState.hidePop = hidePop;

        return () => {
            PopState.showPop = undefined;
            PopState.hidePop = undefined;
        };
    }, [hidePop, showPop]);

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
    }, [pop_list]);

    const show_arr = useMemo(() => {
        const show_arr = [] as JSX.Element[];
        for (const item of pop_list) {
            const { Ele, isShow } = item;
            const props = {
                ...item,
            };
            if (isShow) {
                show_arr.push(<Ele {...props} key={Ele.name}></Ele>);
            }
        }
        return show_arr;
    }, [pop_list]);

    if (!show_arr.length) {
        return null;
    }

    console.log(`test:>`, pop_list);

    return (
        <Box>
            <Sprite key="maskLayer" ref={maskRef as any} name="maskLayer" />
            {...show_arr}
        </Box>
    );
}
