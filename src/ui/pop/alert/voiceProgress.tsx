
import {Scene, Box, ProgressBar, Button} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {progress_bar: React.MutableRefObject<ProgressBar>;progress_btn: React.MutableRefObject<Button>;};
export function VoiceProgressUi(props: {sub_ref: RefObj}) {
    const progress_bar = useRef(null as ProgressBar);
    const progress_btn = useRef(null as Button);
    const {sub_ref} = props;
    sub_ref.progress_bar = progress_bar;
    sub_ref.progress_btn = progress_btn;

    return(
        <Scene width={452} height={58}>
            <Box y={0} x={0} width={452} height={58}>
                <ProgressBar y={21} width={452} ref={progress_bar} skin="image/pop/alert/progress_voice.png" sizeGrid="0,14,0,4" height={13} />
                <Button y={28} x={233} width={54} ref={progress_btn} stateNum={1} skin="image/pop/alert/btn_circle.png" height={58} anchorY={0.5} anchorX={0.5} />
            </Box>
        </Scene>
    );
}