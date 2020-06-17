import React, { useState, useEffect } from 'react';

export type PopInfo = {
    Ele: (...args: any[]) => JSX.Element;
    args: any[];
    isShow: boolean;
    id: string;
};
type Props = { [key: string]: any };
type SceneFc = (props: Props) => JSX.Element;
export const SceneState = {
    curScene: undefined as string,
    switchScene: undefined as (Scene: SceneFc, props?: Props) => void,
};

export function SceneManager(props: { defScene: SceneFc; defProps: Props }) {
    const { defScene, defProps } = props;
    const [curScene, setCurScene] = useState<{ Ele: SceneFc; props: Props }>();

    const switchScene = (scene: SceneFc, props: Props) => {
        setCurScene({ Ele: scene, props });
    };

    useEffect(() => {
        switchScene(defScene, defProps);
    }, []);

    SceneState.switchScene = switchScene;

    if (!curScene) {
        return null;
    }
    const { props: eleProps, Ele } = curScene;

    return (
        <>
            <Ele {...eleProps} />
        </>
    );
}
