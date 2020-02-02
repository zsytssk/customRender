import {
    TestConfig,
    TestEntity,
    TestScope,
    TestScopeFun,
    TestScopeStatus,
} from './interface';
import { parseTest, parseTestEntity } from './state';

export type ScopeConfig = {
    enable: boolean;
};
export class TestScopeCtor implements TestScope {
    public name: string;
    public status: TestScopeStatus = 'normal';
    public children: TestScope[] = [];
    private raw_fun: TestScopeFun;
    public config: TestConfig;
    public entity_list: TestEntity[] = [];
    constructor(name: string, fun?: TestScopeFun, config?: TestConfig) {
        this.name = name;
        this.raw_fun = fun;
        this.config = config || ({} as TestConfig);
    }
    public init(config: TestConfig) {
        const { children } = this;
        this.config = {
            ...config,
            ...this.config,
        };
        for (const item of children) {
            item.init(this.config);
        }
    }
    public addChild(...children: TestScope[]) {
        this.children.push(...children);
    }
    public parseTest() {
        const { raw_fun, children, config } = this;
        if (config.is_on) {
            if (raw_fun) {
                this.entity_list = parseTest(raw_fun);
            }
        }
        for (const item of children) {
            item.parseTest();
        }
    }
    public open(force = false) {
        const { config } = this;
        if (force) {
            config.is_on = true;
        }
        if (config.is_on) {
            return;
        }
        config.is_on = true;
        this.parseTest();
    }
    public close(force = false) {
        if (force) {
            this.config.is_on = false;
            this.entity_list = [];
        }
    }
    public async runTest(msg?: string, params?: any[]) {
        const { config } = this;
        if (!config.is_on) {
            console.warn(
                `TestBuilder:>`,
                `${this.name} is is_on=${this.config.is_on} `,
            );
            return;
        }
        console.group(`TestBuilder:>`, `${this.name}:>`);
        return await this.runTestEntityList(msg, params).then(data => {
            console.groupEnd();
            return data;
        });
    }
    public async runTestEntityList(msg?: string, params?: any[]) {
        const { entity_list } = this;
        for (const entity of entity_list) {
            /** 如果有msg直接运行那个msg 对应的 entity */
            if (msg) {
                if (entity.msg === msg) {
                    return parseTestEntity(entity, params);
                }
            }
        }
    }
}
