
import {Dialog, Image, Label} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {bg: React.MutableRefObject<Image>;label: React.MutableRefObject<Label>;};
export function TipUi(props: {sub_ref: RefObj}) {
    const bg = useRef(null as Image);
    const label = useRef(null as Label);
    const {sub_ref} = props;
    sub_ref.bg = bg;
    sub_ref.label = label;

    return(
        <Dialog width={450} runtime="view/pop/tip.ts" height={75}>
            <Image ref={bg} top={0} skin="image/pop/alert/bg_pop_tip.png" sizeGrid="25,25,25,25" right={0} left={0} bottom={0} alpha={0.8} />
            <Label y={0} x={0} width={451} ref={label} valign="middle" text="this is a test" leading={5} height={73} fontSize={24} color="#fff" align="center" />
        </Dialog>
    );
}