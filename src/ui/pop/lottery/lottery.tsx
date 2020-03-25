
import {Dialog, Box, Image, Sprite, Button, List, UIView, Label, ProgressBar} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {bg: React.MutableRefObject<Box>;title: React.MutableRefObject<Image>;lottery_list: React.MutableRefObject<List>;btn_lottery: React.MutableRefObject<Button>;progress: React.MutableRefObject<ProgressBar>;lottery_remain: React.MutableRefObject<Label>;exchange_list: React.MutableRefObject<List>;};
export function LotteryUi(props: {sub_ref: RefObj}) {
    const bg = useRef(null as Box);
    const title = useRef(null as Image);
    const lottery_list = useRef(null as List);
    const btn_lottery = useRef(null as Button);
    const progress = useRef(null as ProgressBar);
    const lottery_remain = useRef(null as Label);
    const exchange_list = useRef(null as List);
    const {sub_ref} = props;
    sub_ref.bg = bg;
    sub_ref.title = title;
    sub_ref.lottery_list = lottery_list;
    sub_ref.btn_lottery = btn_lottery;
    sub_ref.progress = progress;
    sub_ref.lottery_remain = lottery_remain;
    sub_ref.exchange_list = exchange_list;

    return(
        <Dialog width={1030} sceneBg="laya/views/pop/lottery.png" height={710}>
            <Box y={-2} x={-1} ref={bg}>
                <Image y={77} x={26} width={990} skin="image/pop/shop/bg.png" sizeGrid="0,42,0,42" height={629} />
                <Sprite y={12} texture="image/pop/shop/top_bg.png" />
                <Sprite x={379} texture="image/pop/shop/title_bg.png" />
                <Sprite y={654} x={969} texture="image/pop/shop/star.png" />
                <Image y={19} x={459} ref={title} skin="image/international/txt_lottery_zh.png" />
            </Box>
            <Button y={20} x={937} stateNum={1} skin="image/pop/lottery/btn_close.png" name="close" />
            <Sprite y={1082} x={497} texture="image/pop/lottery/tag_btc.png" />
            <Sprite y={158} x={42} texture="image/pop/lottery/lottery_top_bg.png">
                <List y={12} x={80} width={785} ref={lottery_list} spaceX={20} repeatY={1} repeatX={5} height={138}>
                    <UIView renderType="render" name="item" />
                </List>
                <Button y={152.5} x={753} ref={btn_lottery} stateNum={1} skin="image/pop/lottery/btn_get_lottery.png">
                    <Label y={6} x={8} width={120} valign="middle" text="抽奖" height={35} fontSize={22} color="#914516" bold={true} align="center" />
                </Button>
                <ProgressBar y={176} x={62} width={657} ref={progress} skin="image/loading/progress.png" height={18} />
                <Label y={159.5} x={316.5} width={148} ref={lottery_remain} valign="middle" text="100/1000" strokeColor="#391b06" stroke={2} height={30} fontSize={24} color="#fff" bold={true} align="center" />
            </Sprite>
            <List y={417} width={666} ref={exchange_list} spaceX={20} repeatX={3} height={253} centerX={0}>
                <UIView y={0} x={0} renderType="render" name="item" />
            </List>
            <Sprite y={372} x={222} texture="image/pop/lottery/riborn.png">
                <Label y={10.5} x={242} text="兑 换" stroke={2} fontSize={31} color="#fff6c2" bold={true} />
            </Sprite>
        </Dialog>
    );
}