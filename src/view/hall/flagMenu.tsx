import {
    Box,
    Button,
    Image,
    Label,
    Sprite,
    View,
    List,
} from 'customRenderer/layaCom';
import React from 'react';

export function FlagMenu(props: ComProps) {
    return (
        <View width={87} height={200} {...props}>
            <Image
                var="bg"
                top={0}
                skin="image/hall/coin_menu_bg.png"
                sizeGrid="15,15,15,15"
                right={0}
                left={0}
                bottom={0}
            />
            <Sprite y={0} x={1} texture="image/hall/menu_top_light.png" />
            <List
                y={0}
                x={0}
                width={89}
                var="list"
                selectEnable={true}
                height={199}
            >
                <Box
                    y={8}
                    x={0}
                    width={87}
                    renderType="render"
                    name="item"
                    height={61}
                >
                    <Image
                        y={6}
                        x={21}
                        skin="image/common/flag/flag_en.png"
                        name="flag_icon"
                    />
                </Box>
            </List>
        </View>
    );
}
