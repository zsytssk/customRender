
import {View, Sprite, Label} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {light: React.MutableRefObject<Sprite>;bullet_num: React.MutableRefObject<Label>;cur_light: React.MutableRefObject<Sprite>;bullet_icon: React.MutableRefObject<Sprite>;item_num: React.MutableRefObject<Label>;item_type: React.MutableRefObject<Label>;};
export function ItemUi(props: {sub_ref: RefObj}) {
    const light = useRef(null as Sprite);
    const bullet_num = useRef(null as Label);
    const cur_light = useRef(null as Sprite);
    const bullet_icon = useRef(null as Sprite);
    const item_num = useRef(null as Label);
    const item_type = useRef(null as Label);
    const {sub_ref} = props;
    sub_ref.light = light;
    sub_ref.bullet_num = bullet_num;
    sub_ref.cur_light = cur_light;
    sub_ref.bullet_icon = bullet_icon;
    sub_ref.item_num = item_num;
    sub_ref.item_type = item_type;

    return(
        <View width={141} height={141}>
            <Sprite y={1} x={-13} width={152} texture="image/pop/lottery/lottery_item_bg.png" height={140} />
            <Sprite y={17} x={16.5} ref={light} texture="image/pop/lottery/lottery_item_light.png" />
            <Label y={79} x={47} width={65} ref={bullet_num} valign="middle" text="100" strokeColor="#391b06" stroke={2} height={30} fontSize={24} color="#fff" bold={true} align="right" />
            <Sprite y={0} x={0} ref={cur_light} texture="image/pop/lottery/lottery_item_cur_bg.png" />
            <Sprite y={25} x={38} ref={bullet_icon} texture="image/pop/lottery/bomb_skin1.png" />
            <Label y={41} x={23} width={95} ref={item_num} valign="middle" text="100" strokeColor="#692315" stroke={2} height={30} fontSize={30} color="#f4e090" bold={true} align="center" />
            <Label y={74} x={23} width={95} ref={item_type} valign="middle" text="EOS" strokeColor="#692315" stroke={2} height={30} fontSize={30} color="#f4e090" bold={true} align="center" />
        </View>
    );
}