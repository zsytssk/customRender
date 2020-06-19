import { BitmapFont } from 'laya/display/BitmapFont';
import { Laya, loader } from 'Laya';
import { Text } from 'laya/display/Text';

export function registerFontSize(url_list: string[]) {
    for (const url of url_list) {
        const bitmapFont = new BitmapFont();
        const path_split = url.split('/');
        const name = path_split[path_split.length - 1];
        const font_url = `${url}.fnt`;
        const png_url = `${url}.png`;

        bitmapFont.parseFont(loader.getRes(font_url), loader.getRes(png_url));
        Text.registerBitmapFont(name, bitmapFont);
    }
}
