import * as path from 'path';
import { calcClosestDepth } from './pathUtil';

const IGNORES: string[] = [];
export function setIgnore(dir: string, ignore: string[]) {
    for (let item of ignore) {
        const ignore = path.join(dir, item);
        IGNORES.push(ignore);
    }
}

export function isIgnore(src_path: string) {
    if (!IGNORES.length) {
        return false;
    }
    for (const ignore of IGNORES) {
        if (calcClosestDepth(src_path, ignore) > -1) {
            return true;
        }
    }
    return false;
}
