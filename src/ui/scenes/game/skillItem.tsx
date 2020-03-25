
import {View, Sprite, Image, Label, SkeletonPlayer} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {skill_icon: React.MutableRefObject<Image>;overlay: React.MutableRefObject<Sprite>;num_label: React.MutableRefObject<Label>;border_light: React.MutableRefObject<SkeletonPlayer>;};
export function SkillItemUi(props: {sub_ref: RefObj}) {
    const skill_icon = useRef(null as Image);
    const overlay = useRef(null as Sprite);
    const num_label = useRef(null as Label);
    const border_light = useRef(null as SkeletonPlayer);
    const {sub_ref} = props;
    sub_ref.skill_icon = skill_icon;
    sub_ref.overlay = overlay;
    sub_ref.num_label = num_label;
    sub_ref.border_light = border_light;

    return(
        <View width={94} runtime="view/scenes/game/skillItemView.ts" mouseThrough={false} mouseEnabled={true} height={96}>
            <Sprite y={48} x={47} width={94} texture="image/game/skill_bg.png" pivotY={48} pivotX={47} height={96} />
            <Image y={7} x={8} width={80} ref={skill_icon} skin="image/game/skill_aim.png" height={80} />
            <Sprite y={8} x={8} width={81} ref={overlay} texture="image/game/skill_overlay.png" height={79} />
            <Label y={59} x={8} width={78} ref={num_label} valign="middle" text="200" strokeColor="#000" stroke={2} height={28} fontSize={20} color="#ffffff" align="right" />
            <SkeletonPlayer y={48} x={48.5} visible={false} ref={border_light} url="ani/other/skill_border_light.sk" />
        </View>
    );
}