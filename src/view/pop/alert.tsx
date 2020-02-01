import { Box, Button, Image, Label, Sprite } from 'customRenderer/layaCom';
import { Dialog as LayaDialog } from 'laya/laya/ui/Dialog';
import { Label as LayaLabel } from 'laya/laya/ui/Label';
import React, { useEffect, useRef } from 'react';
import { PopProps, PopState } from './popManager';
import { Laya } from 'laya/Laya';

export const Alert = (props: PopProps) => {
    const { hidePop } = PopState;
    const { id, args, isShow } = props;
    const [msg] = args;
    const self_ele = useRef(null as LayaDialog);
    const label_ele = useRef(null as LayaLabel);
    const hide = () => {
        hidePop(id);
    };
    useEffect(() => {
        const pop = self_ele.current;
        const stage = Laya.stage;
        pop.x = (stage.width - pop.width) / 2;
        pop.y = (stage.height - pop.height) / 2;
        pop.visible = isShow;
    }, []);

    return (
        <Box width={658} height={429} ref={self_ele as any} visible={false}>
            <Box y={0} x={0} width={658} height={427}>
                <Sprite y={0} x={0} texture="image/pop/alert/alert_bg_01.png" />
                <Image
                    y={58}
                    x={0}
                    width={658}
                    skin="image/pop/alert/alert_bg_02.png"
                    sizeGrid="0,38,0,40"
                    height={369}
                />
            </Box>
            <Button
                y={0}
                x={603}
                stateNum={1}
                skin="image/pop/alert/btn_close.png"
                onClick={hide}
            />
            <Image
                y={74}
                x={30}
                width={596}
                skin="image/pop/alert/alert_con_bg.png"
                sizeGrid="24,24,24,24"
                height={222}
            >
                <Label
                    y={7}
                    x={7}
                    width={582}
                    ref={label_ele as any}
                    valign="middle"
                    text={msg}
                    leading={5}
                    height={208}
                    fontSize={24}
                    color="#364a6c"
                    align="center"
                />
            </Image>
            <Button
                y={319}
                x={120}
                var="btn_cancel"
                stateNum={1}
                skin="image/pop/alert/btn_cancel.png"
            >
                <Sprite
                    y={14}
                    x={51}
                    texture="image/international/txt_cancel_zh.png"
                />
            </Button>
            <Button
                y={320}
                x={375}
                var="btn_confirm"
                stateNum={1}
                skin="image/pop/alert/btn_confirm.png"
            >
                <Sprite
                    y={14}
                    x={51}
                    texture="image/international/txt_confirm_zh.png"
                />
            </Button>
            <Sprite
                y={7}
                x={292}
                texture="image/international/txt_tip_title.png"
            />
        </Box>
    );
};
