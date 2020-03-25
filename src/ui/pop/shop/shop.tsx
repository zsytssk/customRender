
import {Dialog, Box, Image, Sprite, Button, List, UIView} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {bg: React.MutableRefObject<Box>;title: React.MutableRefObject<Image>;gun_list: React.MutableRefObject<List>;item_list: React.MutableRefObject<List>;};
export function ShopUi(props: {sub_ref: RefObj}) {
    const bg = useRef(null as Box);
    const title = useRef(null as Image);
    const gun_list = useRef(null as List);
    const item_list = useRef(null as List);
    const {sub_ref} = props;
    sub_ref.bg = bg;
    sub_ref.title = title;
    sub_ref.gun_list = gun_list;
    sub_ref.item_list = item_list;

    return(
        <Dialog width={1045} sceneBg="laya/views/pop/shop.png" runtime="view/pop/shop.ts" height={710}>
            <Box y={-2} x={-1} ref={bg}>
                <Image y={77} x={26} width={990} skin="image/pop/shop/bg.png" sizeGrid="0,42,0,42" height={629} />
                <Sprite y={12} texture="image/pop/shop/top_bg.png" />
                <Sprite x={379} texture="image/pop/shop/title_bg.png" />
                <Sprite y={654} x={969} texture="image/pop/shop/star.png" />
                <Image y={19} x={459} ref={title} skin="image/international/title_shop_zh.png" />
            </Box>
            <Button y={20} x={937} stateNum={1} skin="image/pop/shop/btn_close.png" name="close" />
            <Box y={161} x={44}>
                <Image width={945} skin="image/pop/shop/item_panel_bg.png" sizeGrid="20,20,20,20" height={246} />
                <List y={0} x={0} width={943} ref={gun_list} spaceX={7} repeatY={1} repeatX={5} height={243} hScrollBarSkin="""">
                    <UIView y={6} x={18} renderType="render" name="item" />
                </List>
                <Sprite texture="image/pop/shop/tag_skin.png">
                    <Sprite y={6} x={8} texture="image/international/txt_tag_skin_zh.png" />
                </Sprite>
            </Box>
            <Box y={418} x={45}>
                <Image width={945} skin="image/pop/shop/item_panel_bg.png" sizeGrid="20,20,20,20" height={246} />
                <List y={0} x={0} width={943} ref={item_list} spaceX={7} repeatY={1} repeatX={5} height={243} hScrollBarSkin="""">
                    <UIView y={6} x={18} renderType="render" name="item" />
                </List>
                <Sprite texture="image/pop/shop/tag_item.png">
                    <Sprite y={7} x={6} texture="image/international/txt_tag_item_zh.png" />
                </Sprite>
            </Box>
        </Dialog>
    );
}