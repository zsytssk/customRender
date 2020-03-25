import * as path from 'path';
import { write } from '../zutil/ls/write';
import { walk } from '../zutil/ls/walk';
import { parseFile } from './parseItem';

const src_path = path.resolve(__dirname, '../../laya/pages');
const dist_path = path.resolve(__dirname, '../../src/ui');

async function main() {
    const files = await walk(src_path);
    for (const file of files) {
        const { name, dir } = path.parse(file);
        const rel_dir = path.relative(src_path, dir);
        const dist_dir = path.resolve(dist_path, rel_dir, `${name}.tsx`);

        const str = await parseFile(name, file);
        await write(dist_dir, str);
        // return;
        // console.log(name, rel_dir, dist_dir);
    }
}
main();
