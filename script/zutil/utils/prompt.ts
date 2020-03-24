import * as readline from "readline";

export function prompt(msg: string) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // 对答案进行处理
    rl.question(msg, answer => {
      resolve(answer);
      rl.close();
    });
  });
}
