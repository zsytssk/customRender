import { Test, mapTest } from 'testBuilder';
import { TestBuilderCtor } from 'testBuilder/testBuilder';
import { fish_test } from 'game/fish.spec';
import { shoal_test } from 'game/shoal/shoal.spec';

const testScope = new Test('top');
testScope.addChild(fish_test, shoal_test);
const testBuilder = new TestBuilderCtor(testScope, { is_on: true });
testBuilder.enableDisableTest([], []);
testBuilder.init();

export let testMap: any = mapTest(testBuilder.top_scope);
