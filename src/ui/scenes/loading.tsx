
import {Dialog, Sprite, ProgressBar, SkeletonPlayer} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {progress: React.MutableRefObject<ProgressBar>;};
export function LoadingUi(props: {sub_ref: RefObj}) {
    const progress = useRef(null as ProgressBar);
    const {sub_ref} = props;
    sub_ref.progress = progress;

    return(
        <Dialog width={1920} runtime="view/scenes/loadingView.ts" height={750}>
            <Sprite y={0} x={0} texture="image/loading/load_bg.png" />
            <Sprite y={503} x={546.5} texture="image/loading/loading.png" />
            <ProgressBar y={584} x={529} ref={progress} value={0} skin="image/loading/progress.png" />
            <SkeletonPlayer y={375} x={960} url="image/loading/loading_logo.sk" />
        </Dialog>
    );
}