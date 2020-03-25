
import {Scene, Sprite, Image, Label, Button} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {bg: React.MutableRefObject<Sprite>;icon: React.MutableRefObject<Image>;num_label: React.MutableRefObject<Label>;name_label: React.MutableRefObject<Label>;btn_buy: React.MutableRefObject<Button>;price_label: React.MutableRefObject<Label>;};
export function ShopItemItemUi(props: {sub_ref: RefObj}) {
    const bg = useRef(null as Sprite);
    const icon = useRef(null as Image);
    const num_label = useRef(null as Label);
    const name_label = useRef(null as Label);
    const btn_buy = useRef(null as Button);
    const price_label = useRef(null as Label);
    const {sub_ref} = props;
    sub_ref.bg = bg;
    sub_ref.icon = icon;
    sub_ref.num_label = num_label;
    sub_ref.name_label = name_label;
    sub_ref.btn_buy = btn_buy;
    sub_ref.price_label = price_label;

    return(
        <Scene width={177} height={223}>
            <Sprite y={4} x={0} ref={bg} texture="image/pop/shop/item_skill_box_bg.png" />
            <Sprite y={20} x={40} texture="image/pop/shop/item_bg.png">
                <Image y={4} x={3} width={88} ref={icon} skin="image/pop/shop/icon/gun1.png" height={87} />
                <Sprite y={0} x={-2} texture="image/pop/shop/item_bg_bd.png" />
                <Label y={71} x={40} width={48} ref={num_label} valign="middle" text="10" strokeColor="#000" stroke={1} height={19} fontSize={20} color="#fff" align="right" />
            </Sprite>
            <Label y={122.5} x={29} width={119} ref={name_label} valign="middle" text="默认" height={20} fontSize={20} color="#7a594b" align="center" />
            <Button y={153.5} x={17.5} ref={btn_buy} stateNum={1} skin="image/pop/shop/btn_buy.png">
                <Label y={5} x={53} width={73} ref={price_label} valign="middle" text="121211" height={41} fontSize={18} color="#183272" align="center" />
                <Sprite y={3} x={17} width={36} texture="image/pop/alert/icon_bullet.png" height={42} />
            </Button>
        </Scene>
    );
}