import { CustomRenderer, Box } from 'customRenderer';
import { Laya } from 'Laya';
import { layaInit } from 'layaUtils';
import React, { useEffect } from 'react';
import { PopManager } from 'view/com/popManager';
import { SceneManager } from 'view/com/sceneManager';
import { Hall } from 'view/scene/hall/hall';
import { AppModel } from 'model/appModel';
import { Config } from 'data/config';
import { Lang } from 'data/internationalConfig';

function App() {
    useEffect(() => {
        new AppModel();
    }, []);

    return (
        // <>
        //     <SceneManager defScene={Hall} defProps={{ x: 1 }} />
        //     <PopManager />
        // </>
        <Box width={300} height={300} />
    );
}

init().then(() => {
    CustomRenderer.render(<App />, Laya.stage);
});

function init() {
    const platform_info = platform.getInfo();
    Config.SocketUrl = platform_info.socket_url;
    Config.token = platform_info.token;
    Config.isLogin = platform_info.isLogin;
    Config.cndUrl = platform_info.cdn;
    Config.lang = covertLang(platform_info.lang);

    return layaInit();
}

export function covertLang(ori_lang: string) {
    const save_lang = ori_lang;
    let lang: Lang = Lang.En;
    if (save_lang === 'en') {
        lang = 'en' as Lang;
    } else if (save_lang === 'zh-Hant') {
        lang = 'hk' as Lang;
    } else if (save_lang === 'zh-Hans') {
        lang = 'zh' as Lang;
    } else if (save_lang === 'ja') {
        lang = 'jp' as Lang;
    } else if (save_lang === 'ko') {
        lang = 'kor' as Lang;
    }
    return lang;
}
