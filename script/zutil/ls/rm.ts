import { exists, lstatFile, readdir, rmdir, unlink } from "./asyncUtil";

export async function rm(path: string) {
  if (!(await exists(path))) {
    return;
  }
  const info = await lstatFile(path);
  if (info.isFile()) {
    await unlink(path);
    return;
  }
  const files = await readdir(path);
  for (const file of files) {
    const curPath = path + "/" + file;
    const cur_lstat = await lstatFile(curPath);
    if (cur_lstat.isDirectory()) {
      await rm(curPath);
    } else {
      await unlink(curPath);
    }
  }
  await rmdir(path);
}
export async function clear(path: string) {
  if (!(await exists(path))) {
    return;
  }
  const info = await lstatFile(path);
  if (info.isFile()) {
    await unlink(path);
    return;
  }
  const files = await readdir(path);
  for (const file of files) {
    const curPath = path + "/" + file;
    const cur_lstat = await lstatFile(curPath);
    if (cur_lstat.isDirectory()) {
      await rm(curPath);
    } else {
      await unlink(curPath);
    }
  }
}
