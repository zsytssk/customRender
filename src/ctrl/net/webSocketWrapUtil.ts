import CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';
import {
    Config,
    WebSocketTrait,
    WebSocketWrapCtrl,
    SocketEvent,
} from './webSocketWrap';
import { EventCom } from 'comMan/eventCom';
import { Utils } from 'laya/utils/Utils';
import { Observable, Subscriber } from 'rxjs';

/** socket 的工具函数 */
const common_key_map: Map<string, string> = new Map();
let socket_ctor: Ctor<WebSocketTrait>;
const socket_map: Map<string, WebSocketTrait> = new Map();

/**  监听创建 */
const socket_map_event = new EventCom();
const SocketMapEvent = {
    Create: 'create',
    Disconnect: 'disconnect',
};

export function createSocket(config: Config) {
    return new Promise((resolve, reject) => {
        const { name } = config;
        const ctor = socket_ctor || WebSocketWrapCtrl;
        const socket = new ctor(config);
        socket.event.once(SocketEvent.Init, () => {
            socket_map_event.emit(SocketMapEvent.Create, name, socket);
            socket_map.set(name, socket);
            resolve(socket);
        });
    }) as Promise<WebSocketTrait>;
}
export function waitCreateSocket(name: string) {
    return new Promise((resolve, reject) => {
        const socket = socket_map.get(name);
        if (socket) {
            return resolve(socket);
        }
        socket_map_event.once(
            SocketMapEvent.Create,
            (_name: string, _socket: WebSocketTrait) => {
                if (_name === name) {
                    resolve(_socket);
                }
            },
        );
    }) as Promise<WebSocketTrait>;
}
export function onCreateSocket(name: string, once?: boolean) {
    const observer = new Observable(
        (subscriber: Subscriber<WebSocketTrait>) => {
            const fn = (_name: string, _socket: WebSocketTrait) => {
                if (_name === name) {
                    subscriber.next(_socket);
                    if (once) {
                        subscriber.complete();
                    }
                }
            };
            socket_map_event.on(SocketMapEvent.Create, fn, null);
            subscriber.add(() => {
                socket_map_event.off(SocketMapEvent.Create, null, fn);
            });

            const socket = socket_map.get(name);
            if (socket) {
                fn(name, socket);
            }
        },
    );

    return observer;
}

export function mockSocketCtor(ctor: Ctor<WebSocketTrait>) {
    socket_ctor = ctor;
}
export function getSocket(name: string) {
    return socket_map.get(name);
}
export function disconnectSocket(name: string) {
    const socket = socket_map.get(name);
    if (socket) {
        socket.disconnect();
        socket_map.delete(name);
    }
}

export function createComKey(name: string) {
    const date_str = new Date().toString();
    const comm_key =
        Date.parse(date_str).toString() +
        Date.parse(date_str).toString() +
        Date.parse(date_str).toString().substring(0, 6);
    common_key_map.set(name, comm_key);
    return comm_key;
}

export function genUrl(config: Config) {
    const { url, publicKey, code, host, name } = config;

    // 临时修改
    let new_url = `${url}/gws?auth=${getAuth(name, publicKey)}`;
    if (code) {
        new_url += `&code=${code}`;
    }
    return new_url;
}

export function getAuth(name: string, public_key: string) {
    const comm_key = createComKey(name);
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(public_key);
    const encryptedString = jsencrypt.encrypt(comm_key);
    return encryptedString;
}

export function decrypt(name: string, data: string) {
    try {
        const comm_key = common_key_map.get(name);
        const desData = CryptoJS.AES.decrypt(
            data,
            CryptoJS.enc.Utf8.parse(comm_key),
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            },
        );
        const rep_str = desData.toString(CryptoJS.enc.Utf8);
        const rep = JSON.parse(rep_str);
        return rep;
    } catch {
        console.error('cant decrypt data');
        return '';
    }
}

export function encrypt(name: string, msg: string) {
    const comm_key = common_key_map.get(name);
    const encryptData = CryptoJS.AES.encrypt(
        msg,
        CryptoJS.enc.Utf8.parse(comm_key),
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        },
    );
    return encryptData.toString();
}

export function bindSocketEvent(
    socket: WebSocketTrait,
    bind_obj: any,
    bind_info: { [key: string]: Func<void> },
) {
    const { event } = socket;
    for (const key in bind_info) {
        if (!bind_info.hasOwnProperty(key)) {
            continue;
        }
        event.on(key, bind_info[key], bind_obj);
    }
}

export function offSocketEvent(socket: WebSocketTrait, bind_obj: any) {
    const { event } = socket;
    event.offAllCaller(bind_obj);
}
