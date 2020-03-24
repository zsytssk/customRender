import * as fs from "fs";
import * as http from "http";
import * as https from "https";

export function saveUrl(url: string, path: string) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path);
    const get = url.indexOf("https") === -1 ? http.get : https.get;

    get(url, response => {
      response.pipe(file);
      file.on("finish", () => {
        file.close(); // close() is async, call cb after close completes.
        resolve();
      });
    }).on("error", err => {
      fs.unlink(path, () => {
        reject(err.message);
      });
    });
  });
}
