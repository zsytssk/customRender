import { createRandomString } from "./utils";

type Task = {
  id: string;
  wait_complete: {
    reject: FuncVoid;
    resolve: FuncVoid;
  }[];
};
const task_arr: Task[] = [];
export function registerHook(async_task: Promise<any>) {
  const task_id = createRandomString();
  task_arr.push({
    id: task_id,
    wait_complete: []
  });
  async_task.then(() => {
    completeTask(task_id);
  });
  return task_id;
}

export function untilHookComplete(task_id: string) {
  return new Promise((resolve, reject) => {
    for (const item of task_arr) {
      if (item.id !== task_id) {
        continue;
      }
      item.wait_complete.push({
        reject,
        resolve
      });
      return;
    }
    resolve();
  });
}

function completeTask(task_id: string) {
  for (let i = task_arr.length - 1; i >= 0; i--) {
    const { id, wait_complete } = task_arr[i];
    if (task_id !== id) {
      continue;
    }
    for (const item of wait_complete) {
      item.resolve();
    }
    task_arr.splice(i, 1);
    return;
  }
}
