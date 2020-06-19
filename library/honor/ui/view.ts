import { Dialog } from 'laya/ui/Dialog';
import { Tween } from 'laya/utils/Tween';
import { Scene } from 'laya/display/Scene';

export type HonorDialogConfig = {
    /** 在弹窗模式为multiple时，是否在弹窗弹窗的时候关闭其他显示中的弹窗 */
    closeOther?: boolean;
    /** 模式窗口点击遮罩，是否关闭窗口，默认是关闭的 */
    closeOnSide?: boolean;
    /** 在弹窗模式为multiple时，是否在弹窗弹窗的时候关闭相同group属性的弹窗 */
    closeByGroup?: boolean;
    /** 在弹窗模式为multiple时，是否在弹窗弹窗的时候关闭相同name属性的弹窗 */
    closeByName?: boolean;
    /** 指定对话框是否居中弹。 如果值为true，则居中弹出，否则，则根据对象坐标显示，默认为true。 */
    shadowAlpha?: number;
    /** 弹出框背景透明度 */
    shadowColor?: string;
    /** 指定时间内自动关闭，单位为ms，默认不打开此功能 */
    autoClose?: boolean | number;
    /** 打开之前调用 */
    beforeOpen?: (dialog: HonorDialog) => void;
};

export const DEFAULT_CONFIG = {
    closeOther: false,
    closeOnSide: true,
    closeByGroup: false,
    closeByName: false,
    shadowAlpha: 0.7,
    shadowColor: '#000000',
    autoClose: false,
} as HonorDialogConfig;

/** Honor 中 dialog支持的接口 */
export interface HonorDialog extends Dialog {
    HonorEffectTween?: Tween;
    config?: HonorDialogConfig;
    /** 弹出层打开之前调用... */
    onResize?(width?: number, height?: number): void;
}

export interface HonorScene extends Scene {
    onResize?(width: number, height: number): void;
}

export interface HonorLoadScene extends HonorScene {
    /** 关闭前调用 */
    onHide(): void;
    /** 打开调用 */
    onShow(): void;
    /** 设置进度 */
    onProgress(val: number): void;
}

export type ViewType = 'Scene' | 'Dialog';
export type HonorView = HonorScene | HonorDialog | HonorLoadScene;
