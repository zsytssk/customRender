
import {Scene, Box, Image, SkeletonPlayer, Button, UIView, Label, HTMLDivElement} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {bg: React.MutableRefObject<Box>;pool: React.MutableRefObject<Box>;ani_wrap: React.MutableRefObject<Box>;ctrl_box: React.MutableRefObject<Box>;btn_leave: React.MutableRefObject<Button>;btn_gift: React.MutableRefObject<Button>;btn_voice: React.MutableRefObject<Button>;btn_help: React.MutableRefObject<Button>;skill_box: React.MutableRefObject<UIView>;bullet_box: React.MutableRefObject<Box>;bullet_box_bg: React.MutableRefObject<Image>;bullet_num: React.MutableRefObject<Label>;exchange_rate: React.MutableRefObject<HTMLDivElement>;gun_wrap: React.MutableRefObject<Box>;btn_shop: React.MutableRefObject<Button>;};
export function GameUi(props: {sub_ref: RefObj}) {
    const bg = useRef(null as Box);
    const pool = useRef(null as Box);
    const ani_wrap = useRef(null as Box);
    const ctrl_box = useRef(null as Box);
    const btn_leave = useRef(null as Button);
    const btn_gift = useRef(null as Button);
    const btn_voice = useRef(null as Button);
    const btn_help = useRef(null as Button);
    const skill_box = useRef(null as UIView);
    const bullet_box = useRef(null as Box);
    const bullet_box_bg = useRef(null as Image);
    const bullet_num = useRef(null as Label);
    const exchange_rate = useRef(null as HTMLDivElement);
    const gun_wrap = useRef(null as Box);
    const btn_shop = useRef(null as Button);
    const {sub_ref} = props;
    sub_ref.bg = bg;
    sub_ref.pool = pool;
    sub_ref.ani_wrap = ani_wrap;
    sub_ref.ctrl_box = ctrl_box;
    sub_ref.btn_leave = btn_leave;
    sub_ref.btn_gift = btn_gift;
    sub_ref.btn_voice = btn_voice;
    sub_ref.btn_help = btn_help;
    sub_ref.skill_box = skill_box;
    sub_ref.bullet_box = bullet_box;
    sub_ref.bullet_box_bg = bullet_box_bg;
    sub_ref.bullet_num = bullet_num;
    sub_ref.exchange_rate = exchange_rate;
    sub_ref.gun_wrap = gun_wrap;
    sub_ref.btn_shop = btn_shop;

    return(
        <Scene width={1920} runtime="view/scenes/game/gameView.ts" height={750} autoDestroyAtClosed={true}>
            <Box width={1920} ref={bg} height={750} centerY={0} centerX={0}>
                <Image skin="image/game/normal_bg/bg1.jpg" centerY={0} centerX={0} />
                <SkeletonPlayer y={376} x={960} url="image/game/bg_normal.sk" />
                <SkeletonPlayer y={375} x={960} url="image/game/wave.sk" scaleY={4} scaleX={4} />
            </Box>
            <Box y={0} x={0} width={1920} ref={pool} mouseThrough={false} mouseEnabled={true} height={750} centerY={0} centerX={0} />
            <Box y={0} x={0} width={1920} ref={ani_wrap} height={750} centerY={0} centerX={0} />
            <Box y={0} x={293} width={1334} ref={ctrl_box} mouseThrough={true} mouseEnabled={true} height={750}>
                <Button y={10} x={0} ref={btn_leave} stateNum={1} skin="image/game/btn_quit.png" />
                <Button y={10} x={100} ref={btn_gift} stateNum={1} skin="image/game/btn_gift.png" />
                <Button y={10} ref={btn_voice} stateNum={1} skin="image/game/btn_music.png" right={100} />
                <Button y={10} ref={btn_help} stateNum={1} skin="image/game/btn_help.png" right={0} />
                <UIView y={648} x={460} ref={skill_box} />
                <Box y={653} x={-44.5} width={287} ref={bullet_box} height={92}>
                    <Image x={142} width={286} ref={bullet_box_bg} skin="image/game/account_bg.png" sizeGrid="0,91,0,17" height={92} anchorX={0.5} />
                    <Image y={45} x={31} width={224} skin="image/game/account_bd_bg.png" sizeGrid="0,17,0,17" height={39}>
                        <Label y={8} x={14} width={199} ref={bullet_num} valign="middle" text="剩余子弹:" height={20} fontSize={20} font="SimHei" color="#fdf7d3" align="center" />
                    </Image>
                    <HTMLDivElement y={13} x={44} width={176} ref={exchange_rate} innerHTML="<div style="width: 192px;height: 32px;line-height:32px;font-size: 20px;color:#fff;align:center;"><span>1</span> = <span color="#ffdd76">xxx</span> <span></span> </div>" height={29} />
                </Box>
            </Box>
            <Box y={0} x={0} width={1920} ref={gun_wrap} mouseThrough={true} mouseEnabled={true} height={750} centerY={0} centerX={0} />
            <Button y={0} x={920} ref={btn_shop} stateNum={1} skin="image/game/btn_shop.png" />
        </Scene>
    );
}