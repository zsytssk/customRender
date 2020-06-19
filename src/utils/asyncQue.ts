type AsyncQueFn = () => Promise<any>;
type AwaitQueMap = Map<
    string,
    {
        que: Array<{
            async_fn: AsyncQueFn;
            reject: (is_last: boolean) => void;
            resolve: (is_last: boolean) => void;
        }>;
        is_running: boolean;
    }
>;
const await_que_map: AwaitQueMap = new Map();
/** 将异步函数放到数组中, 一个执行完成 另一个继续执行 一直到结束 */
export function asyncQue(name: string, async_fn: AsyncQueFn) {
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
export function clearAsyncQue(name: string) {
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

type AsyncOnlyFn<T> = () => Promise<T>;
type AwaitOnlyMap = Map<string, AwaitOnlyItem>;
type AwaitOnlyItem = {
    wait: Promise<any>;
    reject: (data: any) => void;
    resolve: (error: any) => void;
};
const await_only_map: AwaitOnlyMap = new Map();

/** 多次调用同一个 promise, 只会运行一次
 * @param async_id 异步函数唯一标识
 * @param async_fn 运行的异步函数
 * @param temp 是否缓存, 默认 temp=false在 async_fn 结束之后就会清理
 * 如果 temp=true, async_fn 结束之后 需要使用 {rejectAsyncOnly} 来清理缓存
 */
export function asyncOnly<T>(
    async_id: string,
    async_fn: AsyncOnlyFn<T>,
    temp = false,
): Promise<T> {
    return new Promise((resolve, reject) => {
        let await_item = await_only_map.get(async_id);
        if (!await_item) {
            let wait = async_fn();
            if (!temp) {
                wait = wait
                    .then(data => {
                        await_only_map.delete(async_id);
                        return data;
                    })
                    .catch(error => {
                        await_only_map.delete(async_id);
                        throw error;
                    });
            }
            await_item = {
                wait,
                reject,
                resolve,
            } as AwaitOnlyItem;
            await_only_map.set(async_id, await_item);
        }
        await_item.wait
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/** 清理 asyncOnly */
export function clearAsyncOnly(asyncId: string) {
    const await_item = await_only_map.get(asyncId);
    if (!await_item) {
        return;
    }
    setTimeout(() => {
        const { reject } = await_item;
        await_only_map.delete(asyncId);
        reject('Async Only be rejected');
    });
}
