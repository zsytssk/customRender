import { WebSocketTrait } from './net/webSocketWrap';
import { ServerName, ServerEvent } from 'data/serverEvent';
import { getSocket } from './net/webSocketWrapUtil';
import { initHallSocket } from './socketCtrl';
import { Config } from 'data/config';
import { getLang } from './hallCtrlUtil';
import { modelState } from 'model/modelState';

/**
 *
 * @return 是否进入游戏
 */
let hall_socket: WebSocketTrait;
export async function onHallSocket(hall: any) {
    await initHallSocket();

    /** 连接socket */
    await new Promise((resolve, reject) => {
        hall_socket = getSocket(ServerName.Hall);

        hall_socket.event.once(
            ServerEvent.UserAccount,
            (data) => {
                modelState.app.initUserInfo(data);
                resolve();
            },
            hall,
        );
        sendToHallSocket(ServerEvent.UserAccount, { domain: Config.Host });
    });

    const [isReplay, socketUrl] = await checkReplay(hall);
    if (isReplay) {
        const lang = getLang();
        hall.enterGame(socketUrl);
        return true;
    }
    return false;
}
export function sendToHallSocket(
    ...params: Parameters<WebSocketTrait['send']>
) {
    hall_socket.send(...params);
}

export async function checkReplay(hall: any) {
    return new Promise((resolve, reject) => {
        const socket = getSocket(ServerName.Hall);
        socket.event.once(
            ServerEvent.CheckReplay,
            (data: CheckReplayRep) => {
                const { isReplay, socketUrl } = data;
                if (isReplay) {
                    resolve([isReplay, socketUrl]);
                    return;
                }
                resolve([isReplay, socketUrl]);
            },
            hall,
        );
        socket.send(ServerEvent.CheckReplay);
    }) as Promise<[boolean, string?]>;
}
