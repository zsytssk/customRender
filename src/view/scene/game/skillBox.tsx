import React from 'react';
import { View, Box, Sprite, SkeletonPlayer } from 'customRenderer';
import { SkillItem } from './skillItem';

export function SkillBox(props: ComProps) {
    return (
        <View width={413} height={102} {...props}>
            <Box y={-18} x={129}>
                <Sprite
                    y={2}
                    x={0}
                    width={158}
                    texture="image/game/energy_bg.png"
                    height={22}
                />
                <Sprite
                    y={2}
                    x={0}
                    width={158}
                    var="energy_bar"
                    texture="image/game/energy_progress.png"
                    height={22}
                />
            </Box>
            <Sprite y={0} x={0} texture="image/game/skill_box_bg.png" />
            <Box y={3} x={15} width={289} var="skill_list" height={96}>
                <SkillItem name="item0" />
                <SkillItem x={97} name="item1" />
                <SkillItem x={194} name="item2" />
            </Box>
            <Sprite
                y={5}
                x={304}
                var="auto_launch"
                texture="image/game/skill_auto.png"
                mouseThrough={false}
                mouseEnabled={true}
            />
            <SkeletonPlayer
                y={-270}
                x={208.5}
                visible={false}
                var="energy_light"
                url="ani/other/energy_light.sk"
                scaleY={2}
                scaleX={2}
            />
        </View>
    );
}
