import {
    Box,
    Button,
    HTMLDivElement,
    Image,
    Label,
    SkeletonPlayer,
} from 'customRenderer/layaCom';
import React from 'react';
import { Scene } from 'view/com/scene';
import { Loading } from 'view/loading';
import { SceneState } from '../../com/sceneManager';
import { SkillBox } from './skillBox';
import { Pool } from './pool';
import { GunWrap } from './gunWrap/gunBoxWrap';
import { Hall } from '../hall/hall';

const res = [
    'image/game/normal_bg/bg1.jpg',
    'image/game/bg_normal.sk',
    'image/game/wave.sk',
    'image/game/btn_quit.png',
    'image/game/btn_gift.png',
    'image/game/btn_music.png',
    'image/game/btn_help.png',
    'image/game/account_bg.png',
    'image/game/account_bd_bg.png',
    'image/game/btn_shop.png',
];

export const Game = Loading(res, GameCom);
// export const Game = GameCom;

export function GameCom() {
    return (
        <Scene>
            <Box width={1920} var="bg" height={750} centerY={0} centerX={0}>
                <Image
                    skin="image/game/normal_bg/bg1.jpg"
                    centerY={0}
                    centerX={0}
                />
                <SkeletonPlayer y={376} x={960} url="image/game/bg_normal.sk" />
                <SkeletonPlayer
                    y={375}
                    x={960}
                    url="image/game/wave.sk"
                    scaleY={4}
                    scaleX={4}
                />
            </Box>
            <Pool />
            <Box
                y={0}
                x={0}
                width={1920}
                var="ani_wrap"
                height={750}
                centerY={0}
                centerX={0}
            />
            <Box
                y={0}
                x={293}
                width={1334}
                var="ctrl_box"
                mouseThrough={true}
                mouseEnabled={true}
                height={750}
            >
                <Button
                    y={10}
                    x={0}
                    var="btn_leave"
                    stateNum={1}
                    skin="image/game/btn_quit.png"
                    onClick={() => {
                        SceneState.switchScene(Hall);
                    }}
                />
                <Button
                    y={10}
                    x={100}
                    var="btn_gift"
                    stateNum={1}
                    skin="image/game/btn_gift.png"
                />
                <Button
                    y={10}
                    x={1154}
                    var="btn_voice"
                    stateNum={1}
                    skin="image/game/btn_music.png"
                />
                <Button
                    y={10}
                    x={1254}
                    var="btn_help"
                    stateNum={1}
                    skin="image/game/btn_help.png"
                />
                <SkillBox y={648} x={460} />
                <Box y={653} x={-44.5} width={287} var="bullet_box" height={92}>
                    <Image
                        x={142}
                        width={286}
                        var="bullet_box_bg"
                        skin="image/game/account_bg.png"
                        sizeGrid="0,91,0,17"
                        height={92}
                        anchorX={0.5}
                    />
                    <Image
                        y={45}
                        x={31}
                        width={224}
                        skin="image/game/account_bd_bg.png"
                        sizeGrid="0,17,0,17"
                        height={39}
                    >
                        <Label
                            y={8}
                            x={14}
                            width={199}
                            var="bullet_num"
                            valign="middle"
                            text="剩余子弹:"
                            height={20}
                            fontSize={20}
                            font="SimHei"
                            color="#fdf7d3"
                            align="center"
                        />
                    </Image>
                    <HTMLDivElement
                        y={13}
                        x={44}
                        width={176}
                        var="exchange_rate"
                        innerHTML='&lt;div style="width: 192px;height: 32px;line-height:32px;font-size: 20px;color:#fff;align:center;"&gt;&lt;span&gt;1&lt;/span&gt; = &lt;span color="#ffdd76"&gt;xxx&lt;/span&gt; &lt;span&gt;&lt;/span&gt; &lt;/div&gt;'
                        height={29}
                    />
                </Box>
            </Box>
            <GunWrap />
            <Button
                y={0}
                x={920}
                var="btn_shop"
                stateNum={1}
                skin="image/game/btn_shop.png"
            />
        </Scene>
    );
}
