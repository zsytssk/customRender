import { WebSocketTrait, Config, SocketEvent } from 'ctrl/net/webSocketWrap';
import { EventCom } from 'comMan/eventCom';
import { Status } from 'honor/net/websocket';

/** 本地测试数据的socket... */
export class MockWebSocket implements WebSocketTrait {
    public event = new EventCom();
    public sendEvent = new EventCom();
    public config: Config;
    public reconnect() {}
    public status = 'OPEN' as Status;
    constructor(config: Config) {
        this.config = config;
        setTimeout(() => {
            this.event.emit(SocketEvent.Init);
        });
    }
    public setParams(params: {}) {
        console.log(params);
    }
    public send(cmd: string, data: {}) {
        this.sendEvent.emit(cmd, data);
        console.log(`mockWebSocket:>`, cmd, data);
    }
    public disconnect() {
        this.event.destroy();
        this.sendEvent.destroy();
        console.log('disconnect');
    }
}
