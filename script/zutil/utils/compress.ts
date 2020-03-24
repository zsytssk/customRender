import * as imagemin from 'imagemin';
import * as imageminMozJpeg from 'imagemin-mozjpeg';
import * as imageminPngquant from 'imagemin-pngquant';
import * as path from 'path';
import { lstatFile } from '../ls/asyncUtil';
import { walk } from '../ls/walk';
import { write } from '../ls/write';

(async () => {
    const start = Date.now();
    const files = await getAllFiles();
    const all_num = files.length;
    let num = 0;
    for (const file of files) {
        const { size } = await lstatFile(file);
        const ext = path.extname(file);
        let data;
        if (ext === '.png') {
            data = await compressPng(file);
        } else {
            data = await compressJpg(file);
        }
        const size_percent = calcPercent(data.toString().length, size * 0.96);

        /** 比原始更大不作处理 */
        if (size_percent >= 97) {
            console.log(
                `${num++}/${all_num}:>`,
                file,
                'compress is big than origin return',
            );
            continue;
        }
        await write(file, data);
        console.log(
            `${num++}/${all_num}:>`,
            file,
            `${size}|${data.toString().length}|${size_percent + '%'}`,
        );
    }

    console.log('completed:>', Date.now() - start);
})();

async function getAllFiles() {
    /** @test */
    const root_path = path.resolve('D:\\zsytssk\\job\\git\\deepsea\\frontend');
    const gamehall = path.resolve(root_path, 'bin');
    const res = path.resolve(gamehall, 'res');
    const assets = path.resolve(gamehall, 'assets');

    // const root_path = path.resolve(__dirname, '../');
    // const gamehall = fs
    //     .readFileSync(root_path + '/publish/gamehall')
    //     .toString();
    // const res = path.resolve(gamehall, 'www\\files\\game\\deepseaglory\\res');
    // const assets = path.resolve(
    //     gamehall,
    //     'www\\files\\game\\deepseaglory\\assets',
    // );
    const wait_res = walk(res);
    const wait_assets = walk(assets);
    const files = await Promise.all([wait_res, wait_assets]).then(vals => {
        return vals[0].concat(vals[1]);
    });
    for (let len = files.length, i = len - 1; i >= 0; i--) {
        const ext = path.extname(files[i]);
        if (ext !== '.png' && ext !== '.jpg') {
            files.splice(i, 1);
        }
    }
    return files;
    /* @test */
    // return [`E:/zsytssk/tools/imageMiniTest/src/task - 副本.png`];
}

function calcPercent(new_val: number, ori_val: number) {
    return Math.floor((new_val / ori_val) * 100);
}
async function compressPng(file: string) {
    const data = await imagemin([file], undefined, {
        plugins: [
            imageminPngquant({ speed: 1, quality: 70 }),
            // imageminOptipng({ optimizationLevel: 7 }),
        ],
    });
    return data[0].data;
}
async function compressJpg(file: string) {
    const data = await imagemin([file], undefined, {
        plugins: [imageminMozJpeg()],
    });
    return data[0].data;
}
