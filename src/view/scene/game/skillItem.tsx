import {
    Label,
    SkeletonPlayer,
    Sprite,
    View,
    Image,
} from 'customRenderer/layaCom';
import React from 'react';

export function SkillItem(props: ComProps) {
    return (
        <View
            width={94}
            mouseThrough={false}
            mouseEnabled={true}
            height={96}
            {...props}
        >
            <Sprite
                y={48}
                x={47}
                width={94}
                texture="image/game/skill_bg.png"
                pivotY={48}
                pivotX={47}
                height={96}
            />
            <Image
                y={7}
                x={8}
                width={80}
                var="skill_icon"
                skin="image/game/skill_aim.png"
                height={80}
            />
            <Sprite
                y={8}
                x={8}
                width={81}
                var="overlay"
                texture="image/game/skill_overlay.png"
                height={79}
            />
            <Label
                y={59}
                x={8}
                width={78}
                var="num_label"
                valign="middle"
                text="200"
                strokeColor="#000"
                stroke={2}
                height={28}
                fontSize={20}
                color="#ffffff"
                align="right"
            />
            <SkeletonPlayer
                y={48}
                x={48.5}
                visible={false}
                var="border_light"
                url="ani/other/skill_border_light.sk"
            />
        </View>
    );
}
