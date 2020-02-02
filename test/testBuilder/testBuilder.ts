import { TestBuilder, TestConfig, TestScope } from './interface';
import { initState } from './state';
import { findTest } from './utils';

export class TestBuilderCtor implements TestBuilder {
    private config = {} as TestConfig;
    public top_scope: TestScope;
    constructor(top_scope: TestScope, default_config?: TestConfig) {
        this.top_scope = top_scope;
        initState();
        if (default_config) {
            this.config = default_config;
        }
    }
    public init() {
        const { config, top_scope } = this;
        top_scope.init(config);

        top_scope.parseTest();
    }
    public findTest(scope: string) {
        const { top_scope } = this;
        const path_arr = scope.split('.');
        const test_scope = findTest(top_scope, path_arr);
        if (!test_scope) {
            console.error(`TestBuilder:>`, `cant find test for ${scope}`);
        }
        return test_scope;
    }
    public runTest(scope: string, msg?: string) {
        const test_scope = this.findTest(scope);
        if (!test_scope) {
            return;
        }
        test_scope.runTest(msg);
    }
    private enableTest(scope: string) {
        const test_scope = this.findTest(scope);
        if (!test_scope) {
            return;
        }
        test_scope.open(true);
    }
    private disableTest(scope: string) {
        const test_scope = this.findTest(scope);
        if (!test_scope) {
            return;
        }
        test_scope.close(true);
    }
    public enableDisableTest(enable_list: string[], disable_list: string[]) {
        for (const item of enable_list) {
            this.enableTest(item);
        }
        for (const item of disable_list) {
            this.disableTest(item);
        }
    }
}
