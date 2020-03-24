import * as fs from "fs";

export function readdir(dir: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, file_list) => {
      if (err) {
        return reject(err);
      }
      resolve(file_list);
    });
  });
}
export async function readFile(file_path: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(file_path, "utf8", (err, file_str: string) => {
      if (err) {
        return reject(err);
      }
      resolve(file_str);
    });
  });
}

export function exists(path: string) {
  return new Promise((resolve, reject) => {
    fs.exists(path, exist => {
      resolve(exist);
    });
  });
}
export function lstatFile(path: string): Promise<fs.Stats> {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

export function rmdir(path: string) {
  return new Promise((resolve, reject) => {
    fs.rmdir(path, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
export function unlink(file_path: string) {
  return new Promise((resolve, reject) => {
    // fs.unlink(file_path, err => {
    //     if (err) {
    //         reject(err);
    //     } else {
    //         resolve();
    //     }
    // });
    try {
      fs.unlinkSync(file_path);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export function mkdir(path: string) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, e => {
      if (!e || (e && e.code === "EEXIST")) {
        resolve();
      } else {
        resolve();
      }
    });
  });
}

export function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
