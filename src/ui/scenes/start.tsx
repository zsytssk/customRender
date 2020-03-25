
import {Scene, Button} from 'customRenderer';
import React, {useRef} from 'react';

export type RefObj = {btn_back: React.MutableRefObject<Button>;};
export function StartUi(props: {sub_ref: RefObj}) {
    const btn_back = useRef(null as Button);
    const {sub_ref} = props;
    sub_ref.btn_back = btn_back;

    return(
        <Scene width={1334} runtime="view/scenes/startView.ts" height={750} autoDestroyAtClosed={true}>
            <Button y={352} x={582} width={133} ref={btn_back} labelSize={18} labelColors="#fff" labelBold={true} label="进入游戏" height={70} />
        </Scene>
    );
}