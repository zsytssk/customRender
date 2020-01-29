import React, { useState, useEffect } from 'react';

type SceneContextValue = string;

export type PopInfo = {
    Ele: (...args: any[]) => JSX.Element;
    args: any[];
    isShow: boolean;
    id: string;
};
export const state = {
    SceneContext: undefined as React.Context<SceneContextValue>,
    setCurScene: undefined as React.Dispatch<React.SetStateAction<string>>,
};

export function useSceneContext() {
    const SceneContext = React.createContext('' as SceneContextValue);
    const [cur_scene, setCurScene] = useState('');
    state.SceneContext = SceneContext;
    state.setCurScene = setCurScene;
    return { cur_scene, SceneContext };
}
