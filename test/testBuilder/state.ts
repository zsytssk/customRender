import { TestEntity, TestFun, TestScopeFun, TestUtil } from './interface';
import { TestEntityCtor } from './testEntity';

export let entity_list: TestEntity[] = [];
export let test_util: TestUtil;
export let cur_test_entity: TestEntity;

export function initState() {
    test_util = {
        describe,
        it,
    };
}

/** 打开Test */
export function parseTest(run_fun: TestScopeFun) {
    entity_list = [];
    try {
        run_fun(test_util);
    } catch (e) {
        console.error(`TestBuilder:>`, e.stack ? e.stack : e);
    }
    return entity_list;
}

function describe(msg: string, fun: TestFun) {
    const entity = new TestEntityCtor(msg, fun);
    entity_list.push(entity);
}
function it(msg: string, fun: TestFun) {
    cur_test_entity.itemList.push({
        msg,
        fun,
    });
}

export async function parseTestEntity(entity: TestEntity, params: any[] = []) {
    const { fun } = entity;

    console.group(`TestBuilder:>`, entity.msg);
    cur_test_entity = entity;
    try {
        return fun(...params);
    } catch (e) {
        console.error(`TestBuilder:>`, e.stack ? e.stack : e);
    }
}
