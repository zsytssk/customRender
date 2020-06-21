import {
    Box,
    Button,
    Image,
    Label,
    Sprite,
    View,
} from 'customRenderer/layaCom';
import React, { useState, useEffect, useRef } from 'react';
import { genRandomStr } from 'utils/utils';
import { alert } from 'view/pop/alert';
import { CoinMenu } from './coinMenu';
import { FlagMenu } from './flagMenu';

export function Header(props: ComProps) {
    const [flagMenuVisible, setFlagMenuVisible] = useState(false);
    const [coinMenuVisible, setCoinMenuVisible] = useState(false);
    const ref = useRef();

    const toggleFlagMenu = () => {
        setFlagMenuVisible(!flagMenuVisible);
    };
    const toggleCoinMenuVisible = () => {
        setCoinMenuVisible(!coinMenuVisible);
    };

    useEffect(() => {
        (window as any).test = ref;
        console.log(ref);
    }, []);

    return (
        <View
            width={1920}
            mouseThrough={true}
            mouseEnabled={true}
            ref={ref}
            height={750}
            {...props}
        >
            <Box y={0} x={0} width={1920} name="bg" height={78}>
                <Sprite texture="image/hall/header_bg.png" />
            </Box>
            <Box y={3} x={320} width={1280} height={78}>
                <CoinMenu
                    y={54}
                    x={0}
                    var="coin_menu"
                    visible={coinMenuVisible}
                />
                <Box
                    y={8}
                    x={0}
                    width={271}
                    var="btn_coin_select"
                    height={56}
                    onClick={toggleCoinMenuVisible}
                >
                    <Button stateNum={1} skin="image/hall/btn_coin_type.png" />
                    <Sprite
                        y={0}
                        x={216}
                        texture="image/hall/split_vertical.png"
                    />
                    <Button
                        y={14}
                        x={224}
                        stateNum={1}
                        skin="image/hall/btn_down.png"
                    />
                    <Label
                        y={16}
                        x={53}
                        width={41}
                        var="coin_name"
                        text="BTC"
                        height={20}
                        fontSize={20}
                        color="#fff392"
                    />
                    <Label
                        width={181}
                        var="coin_num"
                        top={15}
                        text="0"
                        right={61}
                        overflow="hidden"
                        height={20}
                        fontSize={20}
                        color="#fff"
                        anchorY={0.5}
                        anchorX={1}
                        align="right"
                    />
                    <Image
                        y={10}
                        x={18}
                        width={31}
                        var="coin_icon"
                        skin="image/common/coin/BTC.png"
                        height={31}
                    />
                </Box>
                <Box y={3} x={300}>
                    <Button
                        y={-1}
                        x={0}
                        stateNum={1}
                        skin="image/hall/btn_get.png"
                        onClick={() => {
                            const id = genRandomStr();
                            alert('this is a test ' + id);
                        }}
                        var="testAlert"
                    >
                        <Image
                            y={19}
                            x={20}
                            skin="image/international/txt_hall_charge_zh.png"
                        />
                    </Button>

                    <Button
                        y={0}
                        x={133}
                        var="btn_get"
                        stateNum={1}
                        skin="image/hall/btn_get.png"
                    >
                        <Image
                            y={19}
                            x={20}
                            skin="image/international/txt_hall_excharge_zh.png"
                        />
                    </Button>
                </Box>
                <Box y={12} x={885}>
                    <Button
                        y={0}
                        x={0}
                        var="btn_home"
                        stateNum={1}
                        skin="image/hall/btn_home.png"
                    />
                    <Button
                        y={0}
                        x={75}
                        var="btn_app"
                        stateNum={1}
                        skin="image/hall/btn_app.png"
                    />
                    <Button
                        y={0}
                        x={146}
                        visible={false}
                        var="btn_leave"
                        stateNum={1}
                        skin="image/hall/btn_leave.png"
                    />
                    <Button
                        y={0}
                        x={217}
                        var="btn_voice"
                        stateNum={1}
                        skin="image/hall/btn_voice.png"
                    />
                    <Button
                        y={0}
                        x={144}
                        var="btn_login"
                        stateNum={1}
                        skin="image/hall/btn_login.png"
                    />
                </Box>
            </Box>
        </View>
    );
}
