import io from 'socket.io-client';
import { Base64 } from 'js-base64';
import { EventCom } from 'comMan/eventCom';
import { ComponentManager } from 'comMan/component';

const DefaultConfig = {
    forceNew: true,
};

export const SocketEvent = {
    Router: 'router',
    Connect: 'connect',
    ConnectError: 'connect_error',
    Reconnecting: 'reconnecting',
    Disconnect: 'disconnect',
};

export type Config = {
    token: string;
    url: string;
    opts?: SocketIOClient.ConnectOpts;
};

export class SocketCtrl extends ComponentManager {
    private socket: SocketIOClient.Socket;
    private config: Config;
    /** 事件绑定 */
    public event: EventCom;
    constructor(config: Config) {
        super();
        this.socket = null;

        this.init(config);
    }
    private init(config: Config) {
        const { token, opts, url } = config;
        config = {
            ...DefaultConfig,
            ...config,
        };

        this.config = { url, token };
        this.event = new EventCom();

        try {
            this.connect(opts);
        } catch (e) {
            console.error(e);
        }
    }
    private connect(opts: SocketIOClient.ConnectOpts) {
        const { url } = this.config;

        const socket = io(url, opts);
        const event = this.event;

        socket.on(SocketEvent.Router, this.onData);
        socket.on(SocketEvent.Connect, () => {
            event.emit(SocketEvent.Connect);
        });
        socket.on(SocketEvent.ConnectError, (data: any) => {
            event.emit(SocketEvent.ConnectError, data);
        });
        socket.on(SocketEvent.Reconnecting, () => {
            event.emit(SocketEvent.Reconnecting);
        });
        socket.on(SocketEvent.Disconnect, () => {
            event.emit(SocketEvent.Disconnect);
        });

        this.socket = socket;
    }
    private onData = (data_src: string) => {
        const decode_data = Base64.decode(data_src);
        const parsed_data = JSON.parse(decode_data);
        const { cmd, code, params } = parsed_data;
        this.event.emit(cmd, code, params);
    }; //tslint:disable-line

    public send(cmd: string, params = {}) {
        const { token } = this.config;
        const data = {
            cmd,
            params: {
                token,
                ...params,
            },
            status: {
                time: Date.now(),
            },
        };

        const data_str = JSON.stringify(data);
        this.socket.emit(SocketEvent.Router, Base64.encode(data_str));
    }
    public end() {
        this.socket.close();
        this.socket.removeAllListeners();
        this.socket = undefined;
    }
}
