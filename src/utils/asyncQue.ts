type AsyncFn = () => Promise<any>;
type AwaitQueMap = Map<
    string,
    {
        que: Array<{
            async_fn: AsyncFn;
            reject: (is_last: boolean) => void;
            resolve: (is_last: boolean) => void;
        }>;
        is_running: boolean;
    }
>;
const await_que_map: AwaitQueMap = new Map();
export function asyncQue(name: string, async_fn: AsyncFn) {
    return new Promise((resolve, reject) => {
        let await_que = await_que_map.get(name);
        if (!await_que) {
            await_que = {
                is_running: false,
                que: [],
            };
            await_que_map.set(name, await_que);
        }
        const { que, is_running } = await_que;
        putArrLast(que, {
            async_fn,
            resolve,
            reject,
        });
        if (!is_running) {
            runQue(name);
        }
    });
}
/** 清理异步函数队列 */
export function stopAsyncQue(name: string) {
    const await_que = await_que_map.get(name);
    const { length } = await_que.que;
    if (!await_que) {
        return;
    }
    if (length !== 0) {
        const last = await_que.que[length - 1];
        const { resolve } = last;
        resolve(true);
    }
    await_que.que = [];
    await_que.is_running = false;
}

function runQue(name: string) {
    const await_que = await_que_map.get(name);
    const { que } = await_que;
    if (!que.length) {
        await_que.is_running = false;
        return;
    }
    await_que.is_running = true;
    const item = que.shift();
    item.async_fn()
        .then(() => {
            item.resolve(que.length === 0);
            runQue(name);
        })
        .catch(() => {
            item.reject(que.length === 0);
            runQue(name);
        });
}

function putArrLast<T>(arr: T[], item: T) {
    if (!arr.length) {
        arr.push(item);
    } else {
        arr[arr.length - 1] = item;
    }
}
