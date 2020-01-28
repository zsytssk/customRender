import React, { useState, useEffect } from 'react';
import {
    Dialog,
    Sprite,
    ProgressBar,
    SkeletonPlayer,
} from 'customRenderer/layaCom';
import { loadRes } from 'layaUtils';

const load_res = [
    'comp/label.png',
    'image/loading/load_bg.png',
    'image/loading/loading.png',
    'image/loading/progress.png',
    'image/loading/loading_logo.sk',
];

export const Loading = (res: string[], Comp: CtorJSXEle) => {
    return () => {
        const [value, setProgress] = useState(0);
        const [loaded, setLoaded] = useState(false);

        useEffect(() => {
            loadRes([...load_res, ...res], (progress: number) => {
                setProgress(progress);
            }).then(() => {
                setLoaded(true);
            });
        }, []);

        if (loaded) {
            return <Comp></Comp>;
        }

        return (
            <Dialog width={1920} height={750}>
                <Sprite y={0} x={0} texture="image/loading/load_bg.png" />
                <Sprite y={503} x={546} texture="image/loading/loading.png" />
                <ProgressBar
                    y={584}
                    x={529}
                    value={value}
                    skin="image/loading/progress.png"
                />
                <SkeletonPlayer
                    y={375}
                    x={960}
                    url="image/loading/loading_logo.sk"
                />
            </Dialog>
        );
    };
};
