import React, { useState, useEffect } from 'react';
import { genRandomStr } from 'utils/utils';
import { Alert } from './alert';

type PoPContextValue = {
    pop_list: Set<PopInfo>;
};
type ShowPop = (Ele: (...args: any[]) => JSX.Element, ...args: any[]) => void;
type HidePop = (id: string) => void;

export type PopInfo = {
    Ele: (...args: any[]) => JSX.Element;
    args: any[];
    isShow: boolean;
    id: string;
};
export const state = {
    PopContext: undefined as React.Context<PoPContextValue>,
    showPop: undefined as ShowPop,
    hidePop: undefined as HidePop,
    alert() {
        const id = genRandomStr();
        state.showPop(Alert, `this is a test! ${id}`);
    },
};

export function usePopContext() {
    const PopContext = React.createContext({} as PoPContextValue);
    const [pop_list, setPopList] = useState(
        new Set() as PoPContextValue['pop_list'],
    );
    useEffect(() => {
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

        state.showPop = showPop;
        state.hidePop = hidePop;
    }, []);
    state.PopContext = PopContext;
    return { pop_list, PopContext };
}
