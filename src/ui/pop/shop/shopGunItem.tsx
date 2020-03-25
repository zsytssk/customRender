
import {Scene, Sprite, Image, Label, ViewStack, Button} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {bg: React.MutableRefObject<Sprite>;icon: React.MutableRefObject<Image>;name_label: React.MutableRefObject<Label>;stack_btn: React.MutableRefObject<ViewStack>;};
export function ShopGunItemUi(props: {sub_ref: RefObj}) {
    const bg = useRef(null as Sprite);
    const icon = useRef(null as Image);
    const name_label = useRef(null as Label);
    const stack_btn = useRef(null as ViewStack);
    const {sub_ref} = props;
    sub_ref.bg = bg;
    sub_ref.icon = icon;
    sub_ref.name_label = name_label;
    sub_ref.stack_btn = stack_btn;

    return(
        <Scene width={177} height={223}>
            <Sprite y={4} x={0} ref={bg} texture="image/pop/shop/item_gun_box_bg.png" />
            <Sprite y={20} x={40} texture="image/pop/shop/item_bg.png">
                <Image y={3} x={4} width={88} ref={icon} skin="image/pop/shop/icon/1001.png" height={88} />
                <Sprite texture="image/pop/shop/item_bg_bd.png" />
            </Sprite>
            <Label y={122.5} x={29} width={119} ref={name_label} valign="middle" text="默认" height={20} fontSize={20} color="#7a594b" align="center" />
            <ViewStack y={157} x={19} ref={stack_btn}>
                <Button stateNum={1} skin="image/pop/shop/btn_buy.png" name="item0">
                    <Label y={5} x={51} width={73} valign="middle" text="111" name="label" height={41} fontSize={18} color="#183272" align="center" />
                    <Sprite y={3} x={16} width={36} texture="image/pop/alert/icon_bullet.png" height={42} />
                </Button>
                <Button y={0} x={0} stateNum={1} skin="image/pop/shop/btn_use.png" name="item1">
                    <Label y={5} x={9} width={120} valign="middle" text="使 用" name="label" height={41} fontSize={24} color="#914516" align="center" />
                </Button>
                <Button y={0} x={0} stateNum={1} skin="image/pop/shop/btn_used.png" name="item2">
                    <Label y={5} x={9} width={120} valign="middle" text="使用中" name="label" height={41} fontSize={24} color="#914516" align="center" />
                </Button>
            </ViewStack>
        </Scene>
    );
}