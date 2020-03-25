
import {Scene, Sprite, Button, Label, Image} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {btn_buy: React.MutableRefObject<Button>;price_label: React.MutableRefObject<Label>;price_tag: React.MutableRefObject<Image>;remain_label: React.MutableRefObject<Label>;num_label: React.MutableRefObject<Label>;type_label: React.MutableRefObject<Label>;};
export function Item2Ui(props: {sub_ref: RefObj}) {
    const btn_buy = useRef(null as Button);
    const price_label = useRef(null as Label);
    const price_tag = useRef(null as Image);
    const remain_label = useRef(null as Label);
    const num_label = useRef(null as Label);
    const type_label = useRef(null as Label);
    const {sub_ref} = props;
    sub_ref.btn_buy = btn_buy;
    sub_ref.price_label = price_label;
    sub_ref.price_tag = price_tag;
    sub_ref.remain_label = remain_label;
    sub_ref.num_label = num_label;
    sub_ref.type_label = type_label;

    return(
        <Scene width={211} height={253}>
            <Sprite y={0} x={0} width={211} texture="image/pop/lottery/lottery_item2_bg.png" height={253} />
            <Sprite y={28} x={57} texture="image/pop/lottery/lottery_item2_nbg.png" />
            <Button y={179} x={34} ref={btn_buy} stateNum={1} skin="image/pop/lottery/btn_lottery_bug.png">
                <Label y={12} x={65} width={51} ref={price_label} text="500" height={24} fontSize={24} color="#174c7d" align="right" />
                <Image y={6.5} x={17} ref={price_tag} skin="image/pop/lottery/tag_btc.png" />
            </Button>
            <Label y={150} x={44} width={125} ref={remain_label} valign="middle" text="剩余10/20" stroke={1} height={22} fontSize={18} color="#fff" bold={true} align="center" />
            <Label y={42} x={60} width={91} ref={num_label} valign="middle" text="100" strokeColor="#692315" stroke={2} height={30} fontSize={36} color="#f4e090" bold={true} align="center" />
            <Label y={79} x={54} width={102} ref={type_label} valign="middle" text="BTC" strokeColor="#692315" stroke={2} height={30} fontSize={36} color="#f4e090" bold={true} align="center" />
        </Scene>
    );
}