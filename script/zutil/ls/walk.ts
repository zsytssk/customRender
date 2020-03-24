import * as path from "path";
import { lstatFile, readdir } from "./asyncUtil";
import { isIgnore, setIgnore } from "./ignore";

export async function walk(dir: string, ignore?: string[]) {
  dir = path.normalize(dir);
  if (ignore) {
    setIgnore(dir, ignore);
  }
  let file_list: string[] = [];
  const files = await readdir(dir);

  for (const file of files) {
    const file_path = path.join(dir, file);
    if (isIgnore(file_path)) {
      continue;
    }

    const stat = await lstatFile(file_path);
    if (stat.isDirectory()) {
      const sub_files = await walk(file_path);
      file_list = file_list.concat(sub_files);
    } else {
      file_list.push(file_path);
    }
  }

  return file_list;
}
