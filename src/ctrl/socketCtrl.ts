import { getSocket, createSocket } from './net/webSocketWrapUtil';
import { ServerName, ServerEvent } from 'data/serverEvent';
import { Config } from 'data/config';
import { getItem, setItem } from 'utils/localStorage';
import { log } from 'utils/log';
import { Config as SocketConfig, WebSocketTrait } from './net/webSocketWrap';

export async function initHallSocket() {
    let socket = getSocket(ServerName.Hall);
    if (socket) {
        return true;
    }
    socket = await connectSocket(getHallSocketInfo());
    return true;
}

export function getHallSocketInfo(): SocketConfig {
    const code = Config.code;
    const name = ServerName.Hall;
    const { SocketUrl: url, PublicKey: publicKey, Host: host } = Config;

    return {
        url,
        name,
        publicKey,
        code,
        host,
    };
}

export function connectSocket(config: SocketConfig) {
    return new Promise(async (resolve, reject) => {
        const socket = await createSocket(config);

        let token = Config.token;
        if (token) {
            socket.setParams({ jwt: token });
            resolve(socket);
            return;
        }

        /** 获取 本地保存的 token */
        token = getItem('local_token');
        if (!token) {
            token = await getGuestToken(socket);
            setItem('local_token', token, 7);
        }
        /** 游客的token */
        socket.setParams({ jwt: token });
        Config.token = token;
        log('我自己的token:', token);
        resolve(socket);
    }) as Promise<WebSocketTrait>;
}

export function getGuestToken(socket: WebSocketTrait) {
    return new Promise((resolve, reject) => {
        socket.event.once(ServerEvent.GetGuestToken, (res: { jwt: string }) => {
            resolve(res.jwt);
        });
        socket.send(ServerEvent.GetGuestToken);
    }) as Promise<string>;
}
