// 从一个文件夹复制文件到另外文件夹
import * as fs from "fs";
import * as path from "path";
import { exists } from "./asyncUtil";
import { isIgnore } from "./ignore";
import { mk } from "./mk";

export async function cpFile(src_path: string, dist_path: string) {
  if (isIgnore(src_path)) {
    console.error(`${src_path} is ignore!`);
    return;
  }

  const dist_dir = path.resolve(path.dirname(dist_path));
  const is_exists = await exists(src_path);
  if (!is_exists) {
    console.error(`${src_path} doesn't exist`);
    return;
  }
  await mk(dist_dir);

  await new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(src_path);
    const writeStream = fs.createWriteStream(dist_path);

    readStream.on("data", data => {
      writeStream.write(data);
    });
    readStream.on("error", err => {
      throw err;
    });
    readStream.on("end", done => {
      writeStream.end();
      if (done) {
        done();
      }
      resolve();
    });
  });
}
