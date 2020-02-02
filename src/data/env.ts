import { Utils } from 'laya/utils/Utils';

declare const ENV: 'DEV' | 'TEST' | 'PROD';

export const EnvState = {
    localTest: Utils.getQueryString('localTest'),
    origin: '',
    host: '',
    env: '' as typeof ENV,
};

EnvState.env = ENV;
if (ENV === 'DEV') {
    EnvState.origin = 'https://testing-bitfish.cointest.link';
    EnvState.host = 'testing-bitfish.cointest.link';
} else if (ENV === 'TEST') {
    EnvState.origin = location.origin;
} else if (ENV === 'PROD') {
    EnvState.origin = location.origin;
}
