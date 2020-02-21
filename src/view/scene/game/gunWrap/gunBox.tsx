import React from 'react';
import {
    View,
    Box,
    Sprite,
    SkeletonPlayer,
    Image,
    Label,
    Button,
} from 'customRenderer';
import { PlayerModel } from 'model/game/playerModel';

type GunProps = {
    model: PlayerModel;
};
export function GunBox({ model }: GunProps) {
    const { gun } = model;
    const {
        pos: { x, y },
    } = gun;
    return (
        <View
            y={x}
            x={y}
            width={223}
            mouseThrough={true}
            mouseEnabled={true}
            height={223}
            anchorY={0.5}
            anchorX={0.5}
        >
            <Box
                y={114}
                x={111}
                width={149}
                var="ani_box"
                pivotY={77.5}
                pivotX={74}
                height={149}
            >
                <Box y={77.5} x={74} width={59} var="gun_box" height={45}>
                    <SkeletonPlayer var="base" url="ani/gun/base11.sk" />
                    <SkeletonPlayer var="gun" url="ani/gun/gun11.sk" />
                    <SkeletonPlayer
                        y={0}
                        x={0}
                        var="light"
                        url="ani/gun/light11.sk"
                    />
                    <SkeletonPlayer
                        y={0}
                        x={0}
                        var="body"
                        url="ani/gun/light11.sk"
                    />
                </Box>
            </Box>
            <Sprite y={111.5} x={-2} visible={false} var="ctrl_box">
                <Image
                    y={27}
                    x={113}
                    width={150}
                    var="score_box"
                    skin="image/game/time_bg.png"
                    sizeGrid="0,20,0,22"
                    height={48}
                    anchorY={0.5}
                    anchorX={0.5}
                >
                    <Label
                        y={2}
                        x={13}
                        width={124}
                        var="score_label"
                        valign="middle"
                        height={44}
                        font="score_num"
                        align="center"
                    />
                </Image>
                <Button
                    y={1}
                    var="btn_minus"
                    stateNum={1}
                    skin="image/game/btn_minus.png"
                    left={22}
                />
                <Button
                    y={1}
                    x={153}
                    var="btn_add"
                    stateNum={1}
                    skin="image/game/btn_add.png"
                />
            </Sprite>
        </View>
    );
}
