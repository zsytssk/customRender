
import {View, Box, Sprite, Label, UIView, Button, Image} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {user_box: React.MutableRefObject<Box>;nickname: React.MutableRefObject<Label>;coin_menu: React.MutableRefObject<UIView>;btn_coin_select: React.MutableRefObject<Box>;coin_name: React.MutableRefObject<Label>;coin_num: React.MutableRefObject<Label>;coin_icon: React.MutableRefObject<Image>;btn_charge: React.MutableRefObject<Button>;btn_get: React.MutableRefObject<Button>;btn_home: React.MutableRefObject<Button>;btn_app: React.MutableRefObject<Button>;btn_leave: React.MutableRefObject<Button>;btn_voice: React.MutableRefObject<Button>;btn_login: React.MutableRefObject<Button>;flag_menu: React.MutableRefObject<UIView>;flag_box: React.MutableRefObject<Box>;flag: React.MutableRefObject<Image>;};
export function HeaderUi(props: {sub_ref: RefObj}) {
    const user_box = useRef(null as Box);
    const nickname = useRef(null as Label);
    const coin_menu = useRef(null as UIView);
    const btn_coin_select = useRef(null as Box);
    const coin_name = useRef(null as Label);
    const coin_num = useRef(null as Label);
    const coin_icon = useRef(null as Image);
    const btn_charge = useRef(null as Button);
    const btn_get = useRef(null as Button);
    const btn_home = useRef(null as Button);
    const btn_app = useRef(null as Button);
    const btn_leave = useRef(null as Button);
    const btn_voice = useRef(null as Button);
    const btn_login = useRef(null as Button);
    const flag_menu = useRef(null as UIView);
    const flag_box = useRef(null as Box);
    const flag = useRef(null as Image);
    const {sub_ref} = props;
    sub_ref.user_box = user_box;
    sub_ref.nickname = nickname;
    sub_ref.coin_menu = coin_menu;
    sub_ref.btn_coin_select = btn_coin_select;
    sub_ref.coin_name = coin_name;
    sub_ref.coin_num = coin_num;
    sub_ref.coin_icon = coin_icon;
    sub_ref.btn_charge = btn_charge;
    sub_ref.btn_get = btn_get;
    sub_ref.btn_home = btn_home;
    sub_ref.btn_app = btn_app;
    sub_ref.btn_leave = btn_leave;
    sub_ref.btn_voice = btn_voice;
    sub_ref.btn_login = btn_login;
    sub_ref.flag_menu = flag_menu;
    sub_ref.flag_box = flag_box;
    sub_ref.flag = flag;

    return(
        <View width={1920} mouseThrough={true} mouseEnabled={true} height={750}>
            <Box y={0} x={0} width={1920} name="bg" height={78}>
                <Sprite texture="image/hall/header_bg.png" />
            </Box>
            <Box y={3} x={320} width={1280} height={78}>
                <Box y={17} x={0} ref={user_box} mouseThrough={false} mouseEnabled={true}>
                    <Sprite texture="image/hall/avatar.png" />
                    <Label y={9} x={42} width={163} ref={nickname} text="游客" overflow="hidden" height={22} fontSize={22} color="#fff" align="center" />
                </Box>
                <UIView y={54} x={219} visible={false} ref={coin_menu} />
                <Box y={8} x={215} width={271} ref={btn_coin_select} height={56}>
                    <Button stateNum={1} skin="image/hall/btn_coin_type.png" />
                    <Sprite y={0} x={216} texture="image/hall/split_vertical.png" />
                    <Button y={14} x={224} stateNum={1} skin="image/hall/btn_down.png" />
                    <Label y={16} x={53} width={41} ref={coin_name} text="BTC" height={20} fontSize={20} color="#fff392" />
                    <Label width={181} ref={coin_num} top={15} text="0" right={61} overflow="hidden" height={20} fontSize={20} color="#fff" anchorY={0.5} anchorX={1} align="right" />
                    <Image y={10} x={18} width={31} ref={coin_icon} skin="image/common/coin/BTC.png" height={31} />
                </Box>
                <Box y={3} x={578}>
                    <Button y={-1} x={0} ref={btn_charge} stateNum={1} skin="image/hall/btn_get.png">
                        <Image y={19} x={20} skin="image/international/txt_hall_charge_zh.png" />
                    </Button>
                    <Button y={0} x={133} ref={btn_get} stateNum={1} skin="image/hall/btn_get.png">
                        <Image y={19} x={20} skin="image/international/txt_hall_excharge_zh.png" />
                    </Button>
                </Box>
                <Box y={12} x={885}>
                    <Button y={0} x={0} ref={btn_home} stateNum={1} skin="image/hall/btn_home.png" />
                    <Button y={0} x={75} ref={btn_app} stateNum={1} skin="image/hall/btn_app.png" />
                    <Button y={0} x={146} visible={false} ref={btn_leave} stateNum={1} skin="image/hall/btn_leave.png" />
                    <Button y={0} x={217} ref={btn_voice} stateNum={1} skin="image/hall/btn_voice.png" />
                    <Button y={0} x={144} ref={btn_login} stateNum={1} skin="image/hall/btn_login.png" />
                </Box>
                <UIView y={63.5} x={1188} visible={false} ref={flag_menu} />
                <Box y={16} x={1207.7213862390597} ref={flag_box}>
                    <Button y={7} x={45} stateNum={1} skin="image/hall/btn_down.png" />
                    <Image ref={flag} skin="image/common/flag/flag_zh.png" />
                </Box>
            </Box>
        </View>
    );
}