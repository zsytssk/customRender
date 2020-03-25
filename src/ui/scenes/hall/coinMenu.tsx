
import {View, Image, Sprite, List, Box, Label} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {bg: React.MutableRefObject<Image>;list: React.MutableRefObject<List>;};
export function CoinMenuUi(props: {sub_ref: RefObj}) {
    const bg = useRef(null as Image);
    const list = useRef(null as List);
    const {sub_ref} = props;
    sub_ref.bg = bg;
    sub_ref.list = list;

    return(
        <View width={252} sceneBg="laya/views/scenes/hall/coin_menu.png" height={356}>
            <Image ref={bg} top={0} skin="image/hall/flag_bg.png" sizeGrid="15,15,15,15" right={0} left={0} bottom={0} />
            <Sprite y={0} x={56} width={140} texture="image/hall/menu_top_light.png" height={58} />
            <List y={0} x={0} width={252} ref={list} selectEnable={true} height={355}>
                <Box y={8} x={0} width={243} renderType="render" name="item" height={48}>
                    <Sprite y={-3} x={1} texture="image/hall/coin_menu_line.png" />
                    <Label x={243} width={241} valign="middle" scaleY={1} right={0} overflow="visible" name="coin_num" height={46} fontSize={20} color="#fff" centerY={0} anchorY={0.5} anchorX={1} align="right" />
                    <Label y={-1.5} x={47} width={89} valign="middle" text="label" name="coin_name" height={46} fontSize={20} color="#fff392" align="left" />
                    <Image y={4} x={3} width={40} skin="image/common/coin/BTC.png" name="coin_icon" height={40} />
                </Box>
            </List>
        </View>
    );
}