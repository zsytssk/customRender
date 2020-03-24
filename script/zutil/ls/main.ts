import { exists, lstatFile } from './asyncUtil';
import * as path from 'path';
import { cpDir } from './cpDir';
import { cpFile } from './cpFile';
import { mk } from './mk';
import { rm } from './rm';

export async function cp(
    src_path: string,
    dist_path: string,
    progress_fun?: (progress: number) => void,
) {
    if (!(await exists(src_path))) {
        return;
    }
    const stat = await lstatFile(src_path);
    if (stat.isFile()) {
        await cpFile(src_path, dist_path);
    } else if (stat.isDirectory()) {
        await cpDir(src_path, dist_path, progress_fun);
    }
}

export async function mv(src_path: string, dist_path: string) {
    if (!(await exists(src_path))) {
        return;
    }
    if (!(await exists(dist_path))) {
        await mk(dist_path);
    }
    const stat = await lstatFile(src_path);
    let file_num = 1;
    if (stat.isFile()) {
        await cpFile(src_path, dist_path);
    } else if (stat.isDirectory()) {
        file_num = await cpDir(src_path, dist_path);
    }
    rm(src_path);
    return file_num;
}
export async function mvTo(file_path: string, dist_dir: string) {
    if (!(await exists(file_path))) {
        return;
    }
    if (!(await exists(dist_dir))) {
        await mk(dist_dir);
    }
    const stat = await lstatFile(file_path);
    const file_name = path.basename(file_path);
    const dist_path = path.resolve(dist_dir, file_name);
    let file_num = 1;
    if (stat.isFile()) {
        await cpFile(file_path, dist_path);
    } else if (stat.isDirectory()) {
        file_num = await cpDir(file_path, dist_path);
    }
    rm(file_path);
    return file_num;
}
