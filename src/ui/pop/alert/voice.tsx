
import {Dialog, Box, Sprite, Image, Button, UIView} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {music_progress: React.MutableRefObject<UIView>;voice_progress: React.MutableRefObject<UIView>;};
export function VoiceUi(props: {sub_ref: RefObj}) {
    const music_progress = useRef(null as UIView);
    const voice_progress = useRef(null as UIView);
    const {sub_ref} = props;
    sub_ref.music_progress = music_progress;
    sub_ref.voice_progress = voice_progress;

    return(
        <Dialog width={658} sceneBg="laya/views/pop/alert/voice.png" height={427}>
            <Box y={0} x={0} width={658} height={427}>
                <Sprite y={0} x={0} texture="image/pop/alert/alert_bg_01.png" />
                <Image y={58} x={0} width={658} skin="image/pop/alert/alert_bg_02.png" sizeGrid="0,38,0,40" height={369} />
                <Sprite y={8} x={272} texture="image/international/txt_voice_title_zh.png" />
            </Box>
            <Button y={0} x={603} stateNum={1} skin="image/pop/alert/btn_close.png" name="close" />
            <Box y={96} x={46}>
                <Sprite >
                    <Sprite y={13.5} texture="image/pop/alert/split_line.png" />
                    <Sprite y={13.5} x={567} texture="image/pop/alert/split_line.png" scaleX={-1} />
                    <Sprite y={-0.5} x={258} texture="image/international/txt_music_zh.png" />
                </Sprite>
                <Sprite y={54} x={9} texture="image/pop/alert/icon_music.png" />
                <UIView y={53} x={79} ref={music_progress} />
            </Box>
            <Sprite y={248} x={46}>
                <Sprite y={13.5} texture="image/pop/alert/split_line.png" />
                <Sprite y={13.5} x={567} texture="image/pop/alert/split_line.png" scaleX={-1} />
                <Sprite y={-0.5} x={258} texture="image/international/txt_voice_zh.png" />
                <Sprite y={55} x={11} texture="image/pop/alert/icon_voice.png" />
                <UIView y={53} x={79} ref={voice_progress} />
            </Sprite>
        </Dialog>
    );
}