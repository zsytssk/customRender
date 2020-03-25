
import {Scene, Sprite, SkeletonPlayer, Box, Label, UIView} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {bg: React.MutableRefObject<Sprite>;normal_box: React.MutableRefObject<Box>;match_box: React.MutableRefObject<Box>;mermaid: React.MutableRefObject<SkeletonPlayer>;header: React.MutableRefObject<UIView>;btn_play_now: React.MutableRefObject<Box>;};
export function HallUi(props: {sub_ref: RefObj}) {
    const bg = useRef(null as Sprite);
    const normal_box = useRef(null as Box);
    const match_box = useRef(null as Box);
    const mermaid = useRef(null as SkeletonPlayer);
    const header = useRef(null as UIView);
    const btn_play_now = useRef(null as Box);
    const {sub_ref} = props;
    sub_ref.bg = bg;
    sub_ref.normal_box = normal_box;
    sub_ref.match_box = match_box;
    sub_ref.mermaid = mermaid;
    sub_ref.header = header;
    sub_ref.btn_play_now = btn_play_now;

    return(
        <Scene width={1920} runtime="view/scenes/hallView.ts" height={750} autoDestroyAtClosed={true}>
            <Sprite y={0} x={0} ref={bg} texture="image/hall/bg.png" />
            <SkeletonPlayer y={366} x={955.5} width={111} url="image/hall/hall_light.sk" height={111} />
            <Box y={125} x={799} ref={normal_box}>
                <SkeletonPlayer y={350} x={168} url="image/hall/normal_sign.sk" name="ani" />
                <Label y={347} x={88} width={136} valign="middle" text="----" name="coin_name" height={32} fontSize={21} color="#fff580" bold={true} align="center" />
                <Box y={400} x={163} width={151} name="btn_play" height={71}>
                    <SkeletonPlayer y={35.5} x={75.5} url="image/hall/normal_btn.sk" />
                </Box>
                <Box y={400} x={13} width={151} name="btn_try" height={71}>
                    <SkeletonPlayer y={36.5} x={71.5} url="image/hall/try_btn.sk" />
                </Box>
            </Box>
            <Box y={126} x={1193} ref={match_box}>
                <SkeletonPlayer y={287} x={157} url="image/hall/match_sign.sk" name="ani" />
                <Label y={347} x={88} width={136} valign="middle" text="----" name="coin_name" height={32} fontSize={21} color="#fff580" bold={true} align="center" />
                <Box y={400} x={163} width={151} visible={false} name="btn_play" height={71}>
                    <SkeletonPlayer y={35.5} x={75.5} url="image/hall/normal_btn.sk" />
                </Box>
                <Box y={400} x={13} width={151} visible={false} name="btn_try" height={71}>
                    <SkeletonPlayer y={36.5} x={71.5} url="image/hall/try_btn.sk" />
                </Box>
                <Sprite y={405} x={30.5} texture="image/hall/wait_bg.png">
                    <Sprite y={13} x={66} texture="image/international/txt_comming_soon_zh.png" />
                </Sprite>
            </Box>
            <SkeletonPlayer y={397} x={951} ref={mermaid} url="image/hall/mermaid.sk" />
            <UIView y={1} x={0} ref={header} />
            <Box y={612} x={1334} width={258} ref={btn_play_now} height={111}>
                <SkeletonPlayer y={55.5} x={129} url="image/hall/play_now_btn.sk" />
            </Box>
            <SkeletonPlayer y={378} x={975} width={101} url="image/hall/hall_bubble.sk" height={111} />
        </Scene>
    );
}