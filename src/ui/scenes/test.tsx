
import {Scene, SkeletonPlayer, Box} from 'customRenderer';
import React from 'react';

export function TestUi() {
    return(
        <Scene width={1334} height={750}>
            <SkeletonPlayer y={375} x={605} url="ani/other/award_big.sk" />
            <Box y={243} x={475} width={267} height={265} />
        </Scene>
    );
}