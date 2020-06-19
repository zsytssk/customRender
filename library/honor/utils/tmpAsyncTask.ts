/** 将异步任务推送到数组中,完成就删除掉 */
export function tmpAsyncTask<T extends Promise<any>>(
    temp_arr: T[],
    task: T,
): Promise<number> {
    return new Promise((resolve, reject) => {
        temp_arr.push(task);
        task.then(() => {
            const index = temp_arr.indexOf(task);
            if (index !== -1) {
                temp_arr.splice(index, 1);
            }
            resolve(temp_arr.length);
        });
    });
}

const task_arr: Array<{
    dep: any;
    task: Promise<any>;
}> = [];
export function runAsyncTask<T>(fn: () => Promise<T>, dep: any): Promise<T> {
    for (const item of task_arr) {
        if (item.dep === dep) {
            return item.task;
        }
    }

    const task = fn();
    task.then(() => {
        for (let len = task_arr.length, i = len - 1; i >= 0; i--) {
            const { task: _task } = task_arr[i];
            if (task === _task) {
                task_arr.splice(i);
                return;
            }
        }
    });
    task_arr.push({
        dep,
        task,
    });

    return task;
}
