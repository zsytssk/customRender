import React from 'react';
import { View } from 'customRenderer';
import { Laya } from 'laya/Laya';

export function Scene(props: ComProps) {
    const { children } = props;
    const { width } = Laya.stage;
    const x = (width - 1920) / 2;
    return (
        <View x={x} width={1920} height={750} autoDestroyAtClosed={true}>
            {...children}
        </View>
    );
}
