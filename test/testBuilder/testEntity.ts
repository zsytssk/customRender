import { TestEntity, TestFun, TestItem } from './interface';

export class TestEntityCtor implements TestEntity {
    public msg: string;
    public fun: TestFun;
    public children: TestEntityCtor[] = [];
    public itemList: TestItem[] = [];
    constructor(msg: string, fun: TestFun) {
        this.msg = msg;
        this.fun = fun;
    }
}
