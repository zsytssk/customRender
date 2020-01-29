import {
    Box,
    Button,
    Image,
    Label,
    Sprite,
    View,
} from 'customRenderer/layaCom';
import React, { useState } from 'react';
import { CoinMenu } from './coinMenu';
import { FlagMenu } from './flagMenu';
import { PopState } from 'view/pop/popManager';
import { Alert } from 'view/pop/alert';
import { genRandomStr } from 'utils/utils';
import { SceneState } from '../sceneManager';

export function Header(props: ComProps) {
    const [flagMenuVisible, setFlagMenuVisible] = useState(false);
    const toggleFlagMenu = () => {
        setFlagMenuVisible(!flagMenuVisible);
    };
    return (
        <View
            width={1920}
            mouseThrough={true}
            mouseEnabled={true}
            height={750}
            {...props}
        >
            <Box y={0} x={0} width={1920} name="bg" height={78}>
                <Sprite texture="image/hall/header_bg.png" />
            </Box>
            <Box y={3} x={320} width={1280} height={78}>
                <Box
                    y={17}
                    x={0}
                    var="user_box"
                    mouseThrough={false}
                    mouseEnabled={true}
                >
                    <Sprite texture="image/hall/avatar.png" />
                    <Label
                        y={9}
                        x={42}
                        width={163}
                        var="nickname"
                        text="游客"
                        overflow="hidden"
                        height={22}
                        fontSize={22}
                        color="#fff"
                        align="center"
                    />
                </Box>
                <CoinMenu y={54} x={219} visible={false} var="coin_menu" />
                <Box
                    y={8}
                    x={215}
                    width={271}
                    var="btn_coin_select"
                    height={56}
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
                <Box y={3} x={578}>
                    <Button
                        y={-1}
                        x={0}
                        stateNum={1}
                        skin="image/hall/btn_get.png"
                        onClick={() => {
                            const id = genRandomStr();
                            PopState.showPop(Alert, `this is a test! ${id}`);
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
                        onClick={() => {
                            SceneState.setCurScene('game');
                        }}
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
                <FlagMenu
                    y={63.5}
                    x={1188}
                    visible={flagMenuVisible}
                    var="flag_menu"
                />
                <Box y={16} x={1207} var="flag_box" onClick={toggleFlagMenu}>
                    <Button
                        y={7}
                        x={45}
                        stateNum={1}
                        skin="image/hall/btn_down.png"
                    />
                    <Image var="flag" skin="image/common/flag/flag_zh.png" />
                </Box>
            </Box>
        </View>
    );
}
