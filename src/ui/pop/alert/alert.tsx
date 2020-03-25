
import {Dialog, Box, Sprite, Image, Button, Label} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {label: React.MutableRefObject<Label>;btn_cancel: React.MutableRefObject<Button>;btn_confirm: React.MutableRefObject<Button>;};
export function AlertUi(props: {sub_ref: RefObj}) {
    const label = useRef(null as Label);
    const btn_cancel = useRef(null as Button);
    const btn_confirm = useRef(null as Button);
    const {sub_ref} = props;
    sub_ref.label = label;
    sub_ref.btn_cancel = btn_cancel;
    sub_ref.btn_confirm = btn_confirm;

    return(
        <Dialog width={658} sceneBg="laya/views/pop/alert/alert.png" height={429}>
            <Box y={0} x={0} width={658} height={427}>
                <Sprite y={0} x={0} texture="image/pop/alert/alert_bg_01.png" />
                <Image y={58} x={0} width={658} skin="image/pop/alert/alert_bg_02.png" sizeGrid="0,38,0,40" height={369} />
            </Box>
            <Button y={0} x={603} stateNum={1} skin="image/pop/alert/btn_close.png" name="close" />
            <Image y={74} x={30} width={596} skin="image/pop/alert/alert_con_bg.png" sizeGrid="24,24,24,24" height={222}>
                <Label y={7} x={7} width={582} ref={label} valign="middle" text="数据异常，请刷新页面重试!" leading={5} height={208} fontSize={24} color="#364a6c" align="center" />
            </Image>
            <Button y={319} x={120} ref={btn_cancel} stateNum={1} skin="image/pop/alert/btn_cancel.png">
                <Sprite y={14} x={51} texture="image/international/txt_cancel_zh.png" />
            </Button>
            <Button y={320} x={375} ref={btn_confirm} stateNum={1} skin="image/pop/alert/btn_confirm.png">
                <Sprite y={14} x={51} texture="image/international/txt_confirm_zh.png" />
            </Button>
            <Sprite y={7} x={292} texture="image/international/txt_tip_title.png" />
        </Dialog>
    );
}