import * as path from 'path';
import { exists, lstatFile, readdir } from './asyncUtil';
import { cpFile } from './cpFile';
import { isIgnore } from './ignore';

export async function cpDir(
    src_folder: string,
    dist_folder: string,
    progress_fun?: (progress: number) => void,
) {
    let num = 0;

    if (isIgnore(src_folder)) {
        console.error(`${src_folder} is ignore!`);
        return num;
    }

    if (!(await exists(src_folder))) {
        console.error(`${src_folder} doesn't exist!`);
        return num;
    }
    const files = await readdir(src_folder);

    for (const file_name of files) {
        const abs_src_path = path.resolve(src_folder, file_name);
        const abs_dist_path = path.resolve(dist_folder, file_name);
        let add_num = 0;
        const stat = await lstatFile(abs_src_path);
        if (stat.isDirectory()) {
            add_num = await cpDir(abs_src_path, abs_dist_path, progress_fun);
        } else {
            add_num = 1;
            await cpFile(abs_src_path, abs_dist_path);
            if (progress_fun) {
                await progress_fun(add_num);
            }
        }
        num += add_num;
    }
    return num;
}
