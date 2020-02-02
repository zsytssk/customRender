import { TestScope, RunTest } from './interface';

type MapTestObj = {
    [key: string]: MapTestObj | RunTest | TestMap;
};
type TestMap = {
    [key: string]: string;
};
// type RunTest = ();
export function mapTest(scope: TestScope) {
    const { children } = scope;
    const { map, n } = mapTestScope(scope);
    const run = createRun(scope, map);

    let result;
    if (n >= 1) {
        result = { run, map } as MapTestObj;
    } else {
        result = {} as MapTestObj;
    }

    for (const item of children) {
        const { name } = item;
        if (result[name]) {
            console.warn(
                `TestBuilder:>`,
                `${scope.name} has two children has same name:${name}`,
            );
        }

        result[name] = mapTest(item);
    }

    return result;
}

function mapTestScope(scope: TestScope): { map: TestMap; n: number } {
    const { entity_list } = scope;
    const map: {
        [key: string]: string;
    } = {};
    let n = 0;
    for (const [index, item] of entity_list.entries()) {
        map[index] = item.msg;
        n++;
    }

    return {
        map,
        n,
    };
}

function createRun(scope: TestScope, map: TestMap) {
    return (index: string | number, ...params: any[]) => {
        if (typeof index === 'number') {
            return scope.runTest(map[index], params);
        } else if (typeof index === 'string') {
            return scope.runTest(index, params);
        }
    };
}
