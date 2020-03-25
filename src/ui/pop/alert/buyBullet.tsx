
import {Dialog, Box, Sprite, Image, Button, Label} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {btn_minus: React.MutableRefObject<Button>;btn_add: React.MutableRefObject<Button>;cost_num: React.MutableRefObject<Label>;btn_buy: React.MutableRefObject<Button>;};
export function BuyBulletUi(props: {sub_ref: RefObj}) {
    const btn_minus = useRef(null as Button);
    const btn_add = useRef(null as Button);
    const cost_num = useRef(null as Label);
    const btn_buy = useRef(null as Button);
    const {sub_ref} = props;
    sub_ref.btn_minus = btn_minus;
    sub_ref.btn_add = btn_add;
    sub_ref.cost_num = cost_num;
    sub_ref.btn_buy = btn_buy;

    return(
        <Dialog width={658} sceneBg="laya/views/pop/alert/buyBullet.png" height={427}>
            <Box y={0} x={0} width={658} height={427}>
                <Sprite y={0} x={0} texture="image/pop/alert/alert_bg_01.png" />
                <Image y={58} x={0} width={658} skin="image/pop/alert/alert_bg_02.png" sizeGrid="0,38,0,40" height={369} />
                <Sprite y={10} x={272} texture="image/international/txt_buy_bullet_zh.png" />
            </Box>
            <Button y={0} x={603} stateNum={1} skin="image/pop/alert/btn_close.png" name="close" />
            <Sprite y={83} x={271.5} texture="image/pop/alert/bullet_bg.png">
                <Sprite y={8} x={15} texture="image/pop/alert/icon_bullet.png" />
            </Sprite>
            <Box y={212} x={182.5}>
                <Sprite y={8} x={21.5} width={249} texture="image/pop/alert/buy_bullet_input_bg.png" height={40} />
                <Button x={-0.5} ref={btn_minus} stateNum={1} skin="image/pop/alert/btn_minus.png" />
                <Button y={4} x={240.5} ref={btn_add} stateNum={1} skin="image/pop/alert/btn_add.png" />
                <Label y={16} x={43} width={193} valign="middle" text="500" height={24} fontSize={24} color="#fff" align="center" />
            </Box>
            <Label y={270} x={233} width={184} valign="middle" text="需要花费                  EOS" height={27} fontSize={18} color="#71422b" align="left">
                <Label y={0} x={74} width={85} ref={cost_num} text="1231" height={24} font="score_num" align="center" />
            </Label>
            <Button y={322} x={246} ref={btn_buy} stateNum={1} skin="image/pop/alert/btn_confirm.png">
                <Sprite y={13} x={50} texture="image/international/txt_buy_zh.png" />
            </Button>
        </Dialog>
    );
}