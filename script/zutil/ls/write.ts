import * as fs from 'fs';
import * as path from 'path';
import { exists } from './asyncUtil';
import { mk } from './mk';

export async function write(file_path: string, file_content: string) {
    const dir_path = path.dirname(file_path);
    if (!(await exists(dir_path))) {
        await mk(dir_path);
    }

    await new Promise((resolve, reject) => {
        fs.writeFile(file_path, file_content, err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
