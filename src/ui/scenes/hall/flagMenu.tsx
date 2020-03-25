
import {View, Image, Sprite, List, Box} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {bg: React.MutableRefObject<Image>;list: React.MutableRefObject<List>;};
export function FlagMenuUi(props: {sub_ref: RefObj}) {
    const bg = useRef(null as Image);
    const list = useRef(null as List);
    const {sub_ref} = props;
    sub_ref.bg = bg;
    sub_ref.list = list;

    return(
        <View width={87} sceneBg="laya/views/scenes/hall/flagMenu.png" height={200}>
            <Image ref={bg} top={0} skin="image/hall/coin_menu_bg.png" sizeGrid="15,15,15,15" right={0} left={0} bottom={0} />
            <Sprite y={0} x={1} texture="image/hall/menu_top_light.png" />
            <List y={0} x={0} width={89} ref={list} selectEnable={true} height={199}>
                <Box y={8} x={0} width={87} renderType="render" name="item" height={61}>
                    <Image y={6} x={21} skin="image/common/flag/flag_en.png" name="flag_icon" />
                </Box>
            </List>
        </View>
    );
}