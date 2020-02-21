import { testMap } from 'testMap';
import { injectWindow } from './utils/testUtils';
const test = {};

injectWindow({ test, testMap });

// setTimeout(() => {
//     testMap.shoal.run(0);
//     setTimeout(() => {
//         testMap.fish.run(2);
//     }, 10000);
// }, 5000);
