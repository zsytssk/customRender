import { getParams } from './utils';

function createLog(type?: string) {
    // if (getParams('GodMode') !== 'debug') {
    //     // tslint:disable-next-line
    //     return () => {};
    // }

    let log_fun = console[type];
    if (!log_fun) {
        log_fun = console.log;
    }
    return log_fun.bind(window.console);
}
export const log = (console.log = createLog());
export const debug = createLog('debug');
export const error = createLog('error');
