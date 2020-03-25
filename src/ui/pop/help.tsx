
import {Dialog, Sprite, Image, Button} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {title: React.MutableRefObject<Sprite>;};
export function HelpUi(props: {sub_ref: RefObj}) {
    const title = useRef(null as Sprite);
    const {sub_ref} = props;
    sub_ref.title = title;

    return(
        <Dialog width={1150} sceneBg="laya/views/pop/help.png" height={710}>
            <Sprite y={0} x={0} texture="image/pop/help/help_bg_01.png" />
            <Image y={133} x={8} width={1188} skin="image/pop/help/help_bg_02.png" sizeGrid="0,107,0,59" height={569} />
            <Sprite y={0} x={0} texture="image/pop/help/help_bg_01.png" />
            <Sprite y={31} x={527} ref={title} texture="image/international/help_title_zh.png" />
            <Button y={8} x={1077} stateNum={1} skin="image/pop/help/btn_close.png" name="close" />
        </Dialog>
    );
}