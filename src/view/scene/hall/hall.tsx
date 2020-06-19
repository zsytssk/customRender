import React, { useEffect, useRef, useState } from 'react';
import {
    Sprite,
    SkeletonPlayer,
    Box,
    Label,
    View,
} from 'customRenderer/layaCom';
import { View as LayaView } from 'laya/ui/View';
import { Header } from './header';
import { Loading } from 'view/loading';
import { Scene } from 'view/com/scene';
import { onHallSocket } from 'ctrl/hallSocket';

const res_list = [
    'image/hall/bg.png',
    'image/hall/mermaid.png',
    'image/hall/sign_normal.png',
    'image/hall/btn_play.png',
    'image/hall/btn_try.png',
    'image/hall/light.png',
    'image/hall/sigh_match.png',
    'image/hall/btn_play_now.png',
];
export const Hall = Loading(res_list, HallCom);

function HallCom() {
    useEffect(() => {
        onHallSocket(this);
    }, []);

    return (
        <Scene>
            <Sprite y={0} x={0} texture="image/hall/bg.png" />
            <SkeletonPlayer
                y={366}
                x={955.5}
                width={111}
                url="image/hall/hall_light.sk"
                height={111}
            />
            <Box y={125} x={799} var="normal_box" editorInfo="compId=11">
                <SkeletonPlayer
                    y={350}
                    x={168}
                    url="image/hall/normal_sign.sk"
                    name="ani"
                />
                <Label
                    y={347}
                    x={88}
                    width={136}
                    valign="middle"
                    text="----"
                    name="coin_name"
                    height={32}
                    fontSize={21}
                    color="#fff580"
                    bold={true}
                    align="center"
                />
                <Box y={400} x={163} width={151} name="btn_play" height={71}>
                    <SkeletonPlayer
                        y={35.5}
                        x={75.5}
                        url="image/hall/normal_btn.sk"
                    />
                </Box>
                <Box y={400} x={13} width={151} name="btn_try" height={71}>
                    <SkeletonPlayer
                        y={36.5}
                        x={71.5}
                        url="image/hall/try_btn.sk"
                    />
                </Box>
            </Box>
            <Box y={126} x={1193} var="match_box" editorInfo="compId=12">
                <SkeletonPlayer
                    y={287}
                    x={157}
                    url="image/hall/match_sign.sk"
                    name="ani"
                />
                <Label
                    y={347}
                    x={88}
                    width={136}
                    valign="middle"
                    text="----"
                    name="coin_name"
                    height={32}
                    fontSize={21}
                    color="#fff580"
                    bold={true}
                    align="center"
                />
                <Box
                    y={400}
                    x={163}
                    width={151}
                    visible={false}
                    name="btn_play"
                    height={71}
                >
                    <SkeletonPlayer
                        y={35.5}
                        x={75.5}
                        url="image/hall/normal_btn.sk"
                    />
                </Box>
                <Box
                    y={400}
                    x={13}
                    width={151}
                    visible={false}
                    name="btn_try"
                    height={71}
                >
                    <SkeletonPlayer
                        y={36.5}
                        x={71.5}
                        url="image/hall/try_btn.sk"
                    />
                </Box>
                <Sprite y={405} x={30.5} texture="image/hall/wait_bg.png">
                    <Sprite
                        y={13}
                        x={66}
                        texture="image/international/txt_comming_soon_zh.png"
                    />
                </Sprite>
            </Box>
            <SkeletonPlayer
                y={397}
                x={951}
                var="mermaid"
                url="image/hall/mermaid.sk"
                editorInfo="compId=26"
            />
            <Header x={0} y={0}></Header>
            <Box
                y={612}
                x={1334}
                width={258}
                var="btn_play_now"
                height={111}
                editorInfo="compId=39"
            >
                <SkeletonPlayer
                    y={55.5}
                    x={129}
                    url="image/hall/play_now_btn.sk"
                />
            </Box>
            <SkeletonPlayer
                y={378}
                x={975}
                width={101}
                url="image/hall/hall_bubble.sk"
                height={111}
            />
        </Scene>
    );
}
