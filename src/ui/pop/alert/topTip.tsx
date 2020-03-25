
import {Dialog, Image, Label} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {bg: React.MutableRefObject<Image>;label: React.MutableRefObject<Label>;};
export function TopTipUi(props: {sub_ref: RefObj}) {
    const bg = useRef(null as Image);
    const label = useRef(null as Label);
    const {sub_ref} = props;
    sub_ref.bg = bg;
    sub_ref.label = label;

    return(
        <Dialog width={450} runtime="view/pop/topTip.ts" isShowEffect={false} isPopupCenter={false} isModal={false} height={50}>
            <Image ref={bg} top={0} skin="image/pop/alert/bg_pop_tip_bottom.png" sizeGrid="14,25,30,26" right={0} left={0} bottom={0} alpha={0.8} />
            <Label y={0} x={0} width={451} ref={label} valign="middle" text="this is a test" leading={5} height={50} fontSize={22} color="#fff" align="center" />
        </Dialog>
    );
}