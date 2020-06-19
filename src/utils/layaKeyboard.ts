import { Sprite } from 'laya/display/Sprite';
import { Event } from 'laya/events/Event';
import { Box } from 'laya/ui/Box';
import { Label } from 'laya/ui/Label';
import { Image } from 'laya/ui/Image';
import { Laya } from 'Laya';
import { Tween } from 'laya/utils/Tween';
import { Ease } from 'laya/utils/Ease';

const SKIN = {
    confirm:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAWlBMVEUAAADMQkLLQkLLQkL9Y2PLQkLLQkL9Y2PMQkL9Y2PLQkLLQkLdTk75YGD7YmL9Y2P2Xl77YmL9Y2P9Y2P9Y2PLQkL9Y2PLQkL3Xl7cTU3tWFj5YGDoVVXmVFTAQB7jAAAAFnRSTlMA4qyPiltUU9sGBvr59e3cyl/fplYHf9H6ogAAAJVJREFUKM/lzFkOhCAQRdEHCs5TD1WAuv9ttm00xii1Ae/vSS7Wis/7Ree6DHtZRzelm6Z0XyrpUvY/U7S2QNFSvAEDCfXoJW7QkBTooTzK7CR1CBIH1BLXyIX7qKB9nL2G4TmmMxuUiqd7nVh9Acvs3RWdZ7ZYSpjZB3eysCAnwOaXDgVsfsXcAnul0ao6qFLalCv8AOM4RjeBMUEAAAAAAElFTkSuQmCC',
    delete:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAb1BMVEUAAADLy8ttbGzMzMzMzMxtbGzMzMxtbGzMzMxtbGzMzMxubW3MzMxtbGxtbGyQj4/MzMxtbGxtbGzMzMzMzMzMzMzMzMzMzMzMzMxwb29tbGzMzMxtbGzBwcGtra2NjIy/vr6goKCPjo6kpKSko6Pen5mzAAAAG3RSTlMA/N2piVtVVAYGA+ParPr54ZSKW1Hz5OPf2quDrJY6AAAAqklEQVQoz9XPSQ6DMBBE0TKEeR4yum0Dyf3PGCARLLA76/ztk0oqrMWhfxNy65z7YYytPpeH8v6L6UlaO6Urz+rwRUPpLATiq5svMTrJ1MHn2EfNcQ3BsYBk+2P+8XvgWEFzrFFxXOGumO0MD+NmUyCg0aUjBUgyetn1SVkCRETG8m4wRBHmWiKatBI7CaUnImqxlDZkrUnxKfKO6EXYSoLCK3cqvSJIVngDsvlU0+yaOfMAAAAASUVORK5CYII=',
    number:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAeFBMVEUAAADGxsa3t7f///////////////////+3t7e3t7fo6Oi3t7fT09P///////+3t7e6urr///+3t7f///+3t7e3t7f///////////////+3t7e3t7f///+3t7fQ0ND29vb19fX7+/v39/fo6Ojh4eHe3t65ubm4uLiqIy5xAAAAHHRSTlMABeKJVQb64VtV/Prp5NvbrqysppSKW1Hz11xTZZ6wfwAAAKVJREFUKM/d00cSgzAQRNEWOefgIIkM97+hMbhwuUBzAP/tq1nMorFlGrlt8aPbPTdMHNURPxXVH2Q6v0xnG6+q8LcaXJkBmKGaQxMVJ6qQUpzCptiGRbEFTva/3FHaoaW4gUexh4DiAEmv1j6BI9UsH2DapNJJY4C7jNc6Li7WSiHbM7ZSlPsMCjHLofn5d5CzKBj2nrE4Fbs4Yk6m+V/ytczZT1+rJlhgr8lBXAAAAABJRU5ErkJggg==',
};
const KEYS = [
    { text: '1', skin: 'number', x: 20, y: 15 },
    { text: '2', skin: 'number', x: 280, y: 15 },
    { text: '3', skin: 'number', x: 545, y: 15 },
    { text: '4', skin: 'number', x: 20, y: 125 },
    { text: '5', skin: 'number', x: 280, y: 125 },
    { text: '6', skin: 'number', x: 545, y: 125 },
    { text: '7', skin: 'number', x: 20, y: 235 },
    { text: '8', skin: 'number', x: 280, y: 235 },
    { text: '9', skin: 'number', x: 545, y: 235 },
    { text: '0', skin: 'number', x: 810, y: 15 },
    { text: '00', skin: 'number', x: 810, y: 125 },
    { text: '.', skin: 'number', x: 810, y: 235 },
    { text: '', skin: 'confirm', x: 1070, y: 15 },
    { text: '', skin: 'delete', x: 1070, y: 235 },
];
const EVENT_CLICK = Event.CLICK;

const DEFAULT_CONFIG = {
    caller: null,
    /** 点击遮罩关闭键盘 */
    closeOnSide: true,
    /** 遮罩的透明度 */
    shadowAlpha: 0.3,
    /** 遮罩的颜色值 */
    shadowColor: '#000000',
    /** 输入的值为空时的提示 */
    nullMsg: '输入的值不能为空',
    /** 输入字段的最大长度（只针对整数位） */
    length: 11,
    /** 是否允许有小数点 */
    float: false,
    /** 保留的小数位，仅在 float:true 时起作用 */
    fixed: 4,
    delTxt: '删除',
    confirmTxt: '确定',
    /** 输入时的回调函数，参数为当前输入的值 */
    input: (value: string) => {
        console.log('当前输入值：' + value);
    },
    /** 键盘关闭时的回调函数，参数为 type:(confirm|mask)从哪儿关闭， value:当前输入的值 */
    close: (type: string, value: string) => {
        if (type === 'confirm') {
            console.log('点击了确定按钮，关闭输入键盘，当前值：' + value);
        } else {
            console.log('点击了遮罩，关闭输入键盘。');
        }
    },
};

const state = { config: DEFAULT_CONFIG } as { config: typeof DEFAULT_CONFIG };

/***
1.在调用数字键盘时增加作用域选项
  示例：
  ```js
  let config = {
      caller : this, //this为当前模块
      input (value) {
          this.amount.text = value;//此时this为当前模块
      },
      close (type, value) {
          if(type === "confirm"){
              this.amount.text = value;//此时this为当前模块
          }
      }
  }
  Sail.keyboard.enter(this.amount.text, config);
  ```
  等价于
  ```js
  let config = {
      input : function (value) {
          this.amount.text = value;//此时this为当前模块
      }.bind(this),
      close : function (type, value) {
          if(type === "confirm"){
              this.amount.text = value;//此时this为当前模块
          }
      }.bind(this)
  }
  Sail.keyboard.enter(this.amount.text, config);
  ```
2.增加强制关闭键盘功能，此时调用不会触发`close`回掉函数，也没有关闭动画。
  示例：
  `Sail.keyboard.close();`
3.更改首次输入时覆盖之前输入的值
  例如：当前默认值为12345，输入时按了6，则当前值为6

*/

export type Config = Partial<typeof DEFAULT_CONFIG>;
export class KeyBoardNumber extends Box {
    private keyBoardMask: KeyBoardMask;
    private keyBoardPanel: KeyBoardPanel;
    private textValue = '';
    private firstInput = false;
    constructor() {
        super();

        this.init();
    }

    public destroy() {
        Laya.stage.off(Laya.Event.RESIZE, this, this.onResize);
        this.keyBoardMask = null;
        this.keyBoardPanel = null;
        this.textValue = null;

        super.destroy(true);
    }

    private init() {
        this.size(Laya.stage.width, Laya.stage.height);
        this.zOrder = 1000;

        const keyBoardPanel = new KeyBoardPanel();
        keyBoardPanel.on('input', this, this.onInput);
        keyBoardPanel.on('exit', this, this.onExit);
        const keyBoardMask = new KeyBoardMask();
        keyBoardMask.on('exit', this, type => {
            keyBoardPanel.exit(type);
        });

        this.keyBoardMask = keyBoardMask;
        this.keyBoardPanel = keyBoardPanel;
        this.addChildren(keyBoardMask, keyBoardPanel);

        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
    }
    private onExit(type) {
        this.removeSelf();
        if (state.config.close) {
            state.config.close.call(
                state.config.caller,
                type,
                type === 'confirm' ? this.textValue + '' : null,
            );
        }
        this.textValue = '';
    }
    private onInput(text: string) {
        const {
            delTxt,
            confirmTxt,
            nullMsg,
            input,
            float,
            fixed,
            length,
        } = state.config;
        switch (text) {
            case delTxt:
                const _text = this.textValue.split('');
                _text.pop();
                this.textValue = _text.join('');

                if (this.textValue) {
                    this.keyBoardPanel.update(this.textValue, '#ffffff');
                } else {
                    this.keyBoardPanel.update(nullMsg, '#ff0000');
                }
                if (input) {
                    input.call(state.config.caller, this.textValue);
                }
                break;
            case confirmTxt:
                this.keyBoardPanel.exit('confirm');
                break;
            default:
                if (this.firstInput) {
                    this.textValue = '';
                    this.firstInput = false;
                }
                if (text === '.') {
                    if (float !== true) {
                        return;
                    }
                    if (this.textValue === '') {
                        text = '0.';
                    }
                    if (this.textValue.indexOf('.') !== -1) {
                        return;
                    }
                }
                if (float === true) {
                    const decimal = this.textValue.split('.')[1];
                    if (decimal && decimal.length >= fixed) {
                        return;
                    }
                }
                if ((this.textValue + text).length > length) {
                    return;
                }

                this.textValue = this.textValue + text;
                this.textValue = this.textValue.replace(/^0+/, '');

                if (input) {
                    input.call(state.config.caller, this.textValue);
                }
                if (this.textValue) {
                    this.keyBoardPanel.update(this.textValue, '#ffffff');
                } else {
                    this.keyBoardPanel.update(nullMsg, '#ff0000');
                }
        }
    }

    public enter(value: string, config: Config) {
        state.config = {
            ...state.config,
            ...config,
        };

        this.textValue = value;
        this.firstInput = true;
        Laya.timer.callLater(this, () => {
            this.keyBoardMask.update(
                this.width,
                this.height,
                state.config.shadowAlpha,
                state.config.shadowColor,
                state.config.closeOnSide,
            );
            this.keyBoardPanel.enter(this.textValue);
        });
        Laya.stage.addChild(this);
    }
    public close() {
        this.removeSelf();
        this.textValue = '';
        this.keyBoardPanel.exit('force');
    }
    public onResize() {
        const width = Laya.stage.width;
        const height = Laya.stage.height;
        this.size(width, height);

        this.keyBoardMask.resize(width, height);
        this.keyBoardPanel.resize(width, height);
    }
}

class KeyBoardMask extends Sprite {
    private configAlpha: number;
    private configColor: string;
    private closeOnSide: boolean;
    constructor() {
        super();
        this.configAlpha = null;
        this.configColor = null;
        this.closeOnSide = false;
        this.on(EVENT_CLICK, this, () => {
            if (this.closeOnSide) {
                this.event('exit', ['mask', null]);
            }
        });
    }
    public update(width, height, alpha, color, closeOnSide) {
        this.alpha = this.configAlpha = alpha;
        this.configColor = color;
        this.closeOnSide = closeOnSide;

        this.resize(width, height);
    }
    public resize(width, height) {
        this.size(width, height);
        this.graphics.clear();
        this.graphics.drawRect(0, 0, this.width, this.height, this.configColor);
        this.alpha = this.configAlpha;
    }
}

class InputText extends Box {
    private Mask: KeyBoardMask;
    private textValue: Label;
    private originHeight: number;
    constructor() {
        super();
        this.init();
    }
    public destroy() {
        super.destroy();
        this.Mask = null;
        this.textValue = null;
        this.originHeight = null;
    }
    private init() {
        this.originHeight = 60;

        const mask = new KeyBoardMask();
        mask.update(this.width, this.height, 0.5, '#000000', false);

        const text = new Label();
        text.height = 30;
        text.fontSize = 30;
        text.align = 'center';

        this.Mask = mask;
        this.textValue = text;
        this.addChildren(mask, text);
    }
    public update(value: string, color: string) {
        this.textValue.color = color;
        this.textValue.text = value;
    }
    public resize(width, height) {
        const yrate = height / 1334;

        this.size(width, this.originHeight * yrate);
        this.Mask.resize(this.width, this.height);
        this.textValue.width = width;
        this.textValue.bottom = 0;
        this.top = -this.height;
    }
}

type KeyBoardButtonConfig = {
    text: string;
    skin: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
};
type KeyBoardButtonConfigCallback = (text: string) => void;
class KeyBoardButton extends Image {
    private config: KeyBoardButtonConfig;
    private label: Label;
    constructor(
        config: KeyBoardButtonConfig,
        callback: KeyBoardButtonConfigCallback,
    ) {
        super();
        this.init(config, callback);
    }
    public destroy() {
        super.destroy(true);

        this.config = null;
        this.label = null;
    }

    private init(
        config: KeyBoardButtonConfig,
        callback: KeyBoardButtonConfigCallback,
    ) {
        config.width = 240;
        config.height = config.skin === 'confirm' ? 210 : 100;
        this.config = config;

        this.skin = SKIN[config.skin];
        this.sizeGrid = '15,15,15,15';

        this.resize(Laya.stage.width, Laya.stage.height);
        this.create();

        this.on(EVENT_CLICK, this, () => {
            callback(this.config.text);
        });
    }
    private create() {
        const { text, skin } = this.config;
        let label_text = text;
        if (skin === 'confirm') {
            label_text = state.config.confirmTxt;
        } else if (skin === 'delete') {
            label_text = state.config.delTxt;
        }
        this.config.text = label_text;

        const label = new Label(label_text);
        label.color = skin === 'confirm' ? '#ffffff' : '#1c1c1c';
        label.font = 'arial';
        label.align = 'center';
        label.fontSize = 40;
        label.size(this.width, label.fontSize);
        label.centerY = 0;

        this.label = label;
        this.addChild(label);
    }
    public enter() {
        const { text, skin } = this.config;
        let label_text = text;
        if (skin === 'confirm') {
            label_text = state.config.confirmTxt;
        } else if (skin === 'delete') {
            label_text = state.config.delTxt;
        }
        this.config.text = label_text;
        this.label.text = label_text;
    }
    private resize(width, height) {
        const xrate = width / 1334;
        const yrate = height / 1334;

        this.size(this.config.width * xrate, this.config.height * yrate);
        this.pos(this.config.x * xrate, this.config.y * yrate);
        if (this.label) {
            this.label.width = this.width;
        }
    }
}

class KeyBoardPanel extends Box {
    private inputText: InputText;
    private panelMask: KeyBoardMask;
    private textValue: string;
    private keys: KeyBoardButton[] = [];
    constructor() {
        super();
        this.init();
    }
    private init() {
        let height = Laya.stage.height;
        height = height < 750 ? 750 : height;

        this.size(Laya.stage.width, (height / 1334) * 350);
        this.bottom = -this.height;

        const panelMask = new KeyBoardMask();
        panelMask.update(this.width, this.height, 0.5, '#000000', false);

        const inputText = new InputText();
        inputText.resize(this.width, height);

        this.inputText = inputText;
        this.panelMask = panelMask;
        this.addChildren(panelMask, inputText);

        for (const item of KEYS) {
            this.keys.push(new KeyBoardButton(item, this.onClick.bind(this)));
        }

        this.addChildren(...this.keys);
    }
    private onClick(text: string) {
        this.event('input', [text]);
    }

    public update(value, color) {
        this.inputText.update(value, color);
    }
    public enter(value: string) {
        this.inputText.update(value, '#ffffff');

        Tween.to(this, { bottom: 0 }, 200, Ease.cubicOut);

        for (const item of this.keys) {
            item.enter();
        }
    }
    public exit(type: string) {
        if (type === 'force') {
            this.bottom = -this.height;
            return;
        }
        Tween.to(
            this,
            { bottom: -this.height },
            150,
            Ease.cubicOut,
            Laya.Handler.create(this, () => {
                this.event('exit', [type]);
            }),
        );
    }
    public resize(width: number, height: number) {
        height = height < 750 ? 750 : height;
        const yrate = height / 1334;

        this.size(width, 350 * yrate);
        this.panelMask.resize(this.width, this.height);

        this.inputText.resize(width, height);
        for (const i of Object.keys(this.keys)) {
            this.keys[i].resize(width, height);
        }
    }
}
