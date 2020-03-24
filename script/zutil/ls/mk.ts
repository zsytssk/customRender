// 从一个文件夹复制文件到另外文件夹
import * as path from "path";
import { exists, mkdir } from "./asyncUtil";

export async function mk(dir_path: string) {
  if (await exists(dir_path)) {
    return true;
  }

  dir_path = path.normalize(dir_path);
  const path_arr = dir_path.split(path.sep);
  for (let i = 0; i < path_arr.length; i++) {
    if (!path_arr[i]) {
      continue;
    }
    const cur_dir = path_arr.slice(0, i + 1).join(path.sep);
    if (!(await exists(cur_dir))) {
      await mkdir(cur_dir);
    }
  }
}
