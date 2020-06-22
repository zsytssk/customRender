import { ProgressBar, SkeletonPlayer, Sprite } from 'customRenderer/layaCom';
import { loadRes } from 'layaUtils';
import React, { useEffect, useState } from 'react';
import { Pop } from './com/pop';

const load_res = [
    'comp/label.png',
    'image/loading/load_bg.png',
    'image/loading/loading.png',
    'image/loading/progress.png',
    'image/loading/loading_logo.sk',
];

export const Loading = (res: string[], Comp: CtorJSXEle) => {
    return function LoadCom() {
        const [value, setProgress] = useState(0);
        const [delay, setDelay] = useState(true);
        const [loaded, setLoaded] = useState(false);

        useEffect(() => {
            loadRes([...load_res, ...res], (progress: number) => {
                setProgress(progress);
            }).then(() => {
                setLoaded(true);
            });

            /** 最少显示500ms loading */
            const timeout = setTimeout(() => {
                setDelay(false);
            }, 500);

            return () => {
                clearTimeout(timeout);
            };
        }, []);

        if (loaded && !delay) {
            return <Comp></Comp>;
        }

        return (
            <Pop width={1920} height={750} isShow={true}>
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
            </Pop>
        );
    };
};
