
import {View, Box, SkeletonPlayer, Sprite, Image, Label, Button} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {ani_box: React.MutableRefObject<Box>;gun_box: React.MutableRefObject<Box>;base: React.MutableRefObject<SkeletonPlayer>;gun: React.MutableRefObject<SkeletonPlayer>;light: React.MutableRefObject<SkeletonPlayer>;body: React.MutableRefObject<SkeletonPlayer>;ctrl_box: React.MutableRefObject<Sprite>;score_box: React.MutableRefObject<Image>;score_label: React.MutableRefObject<Label>;btn_minus: React.MutableRefObject<Button>;btn_add: React.MutableRefObject<Button>;};
export function GunBoxUi(props: {sub_ref: RefObj}) {
    const ani_box = useRef(null as Box);
    const gun_box = useRef(null as Box);
    const base = useRef(null as SkeletonPlayer);
    const gun = useRef(null as SkeletonPlayer);
    const light = useRef(null as SkeletonPlayer);
    const body = useRef(null as SkeletonPlayer);
    const ctrl_box = useRef(null as Sprite);
    const score_box = useRef(null as Image);
    const score_label = useRef(null as Label);
    const btn_minus = useRef(null as Button);
    const btn_add = useRef(null as Button);
    const {sub_ref} = props;
    sub_ref.ani_box = ani_box;
    sub_ref.gun_box = gun_box;
    sub_ref.base = base;
    sub_ref.gun = gun;
    sub_ref.light = light;
    sub_ref.body = body;
    sub_ref.ctrl_box = ctrl_box;
    sub_ref.score_box = score_box;
    sub_ref.score_label = score_label;
    sub_ref.btn_minus = btn_minus;
    sub_ref.btn_add = btn_add;

    return(
        <View y={111} x={111} width={223} runtime="view/scenes/game/gunBoxView.ts" mouseThrough={true} mouseEnabled={true} height={223} anchorY={0.5} anchorX={0.5}>
            <Box y={114} x={111} width={149} ref={ani_box} pivotY={77.5} pivotX={74} height={149}>
                <Box y={77.5} x={74} width={59} ref={gun_box} height={45}>
                    <SkeletonPlayer ref={base} url="ani/gun/base11.sk" />
                    <SkeletonPlayer ref={gun} url="ani/gun/gun11.sk" />
                    <SkeletonPlayer y={0} x={0} ref={light} url="ani/gun/light11.sk" />
                    <SkeletonPlayer y={0} x={0} ref={body} url="ani/gun/light11.sk" />
                </Box>
            </Box>
            <Sprite y={111.5} x={-2} visible={false} ref={ctrl_box}>
                <Image y={27} x={113} width={150} ref={score_box} skin="image/game/time_bg.png" sizeGrid="0,20,0,22" height={48} anchorY={0.5} anchorX={0.5}>
                    <Label y={2} x={13} width={124} ref={score_label} valign="middle" height={44} font="score_num" align="center" />
                </Image>
                <Button y={1} ref={btn_minus} stateNum={1} skin="image/game/btn_minus.png" left={22} />
                <Button y={1} x={153} ref={btn_add} stateNum={1} skin="image/game/btn_add.png" />
            </Sprite>
        </View>
    );
}