import { TestFun, TestScope, RunTest } from './interface';

export function findTest(scope: TestScope, path: string[]): TestScope {
    const { children } = scope;
    if (!path.length) {
        return scope;
    }
    const cur_name = path.shift();
    for (const item of children) {
        if (item.name === cur_name) {
            return findTest(item, path);
        }
    }
}

export function asyncRunTestFun(fun: TestFun) {
    return new Promise((resolve, reject) => {
        try {
            const result = fun();
            if (result instanceof Promise) {
                result.then(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        } catch (err) {
            reject(err);
        }
    });
}

type asyncRunTestFunType = 'schedule' | 'concurrent';
export async function asyncRunTestFunArr(
    fun: TestFun[],
    type?: asyncRunTestFunType,
) {
    if (type === 'concurrent') {
        const result: Promise<any>[] = [];
        for (const item of fun) {
            result.push(asyncRunTestFun(item));
        }
        await Promise.all(result);
        return;
    }

    for (const item of fun) {
        await asyncRunTestFun(item);
    }
}

export function noImplement() {
    throw new Error('no implement');
}
export function newError(msg: string) {
    throw new Error(msg);
}
