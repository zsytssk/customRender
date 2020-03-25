
import {View, Box, Sprite, UIView, SkeletonPlayer} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {energy_bar: React.MutableRefObject<Sprite>;skill_list: React.MutableRefObject<Box>;auto_launch: React.MutableRefObject<Sprite>;energy_light: React.MutableRefObject<SkeletonPlayer>;};
export function SkillBoxUi(props: {sub_ref: RefObj}) {
    const energy_bar = useRef(null as Sprite);
    const skill_list = useRef(null as Box);
    const auto_launch = useRef(null as Sprite);
    const energy_light = useRef(null as SkeletonPlayer);
    const {sub_ref} = props;
    sub_ref.energy_bar = energy_bar;
    sub_ref.skill_list = skill_list;
    sub_ref.auto_launch = auto_launch;
    sub_ref.energy_light = energy_light;

    return(
        <View width={413} height={102}>
            <Box y={-18} x={129}>
                <Sprite y={2} x={0} width={158} texture="image/game/energy_bg.png" height={22} />
                <Sprite y={2} x={0} width={158} ref={energy_bar} texture="image/game/energy_progress.png" height={22} />
            </Box>
            <Sprite y={0} x={0} texture="image/game/skill_box_bg.png" />
            <Box y={3} x={15} width={289} ref={skill_list} height={96}>
                <UIView name="item0" />
                <UIView x={97} name="item1" />
                <UIView x={194} name="item2" />
            </Box>
            <Sprite y={5} x={304} ref={auto_launch} texture="image/game/skill_auto.png" mouseThrough={false} mouseEnabled={true} />
            <SkeletonPlayer y={-270} x={208.5} visible={false} ref={energy_light} url="ani/other/energy_light.sk" scaleY={2} scaleX={2} />
        </View>
    );
}