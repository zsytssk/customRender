import React from 'react';
import { Box as LayaBox } from 'laya/laya/ui/Box';
import { Event } from 'laya/laya/events/Event';
import { Label as LayaLabel } from 'laya/laya/ui/Label';
import { Stage as LayaStage } from 'laya/laya/display/Stage';
import { Button as LayaButton } from 'laya/laya/ui/Button';
import { HBox as LayaHBox } from 'laya/laya/ui/HBox';
import { VBox as LayaVBox } from 'laya/laya/ui/VBox';
import { Image as LayaImage } from 'laya/laya/ui/Image';
import { Clip as LayaClip } from 'laya/laya/ui/Clip';
import { ComboBox as LayaComboBox } from 'laya/laya/ui/ComboBox';
import { Tab as LayaTab } from 'laya/laya/ui/Tab';
import { HScrollBar as LayaHScrollBar } from 'laya/laya/ui/HScrollBar';
import { HSlider as LayaHSlider } from 'laya/laya/ui/HSlider';
import { List as LayaList } from 'laya/laya/ui/List';
import { CheckBox as LayaCheckBox } from 'laya/laya/ui/CheckBox';
import { RadioGroup as LayaRadioGroup } from 'laya/laya/ui/RadioGroup';
import { Radio as LayaRadio } from 'laya/laya/ui/Radio';
import { Panel as LayaPanel } from 'laya/laya/ui/Panel';
import { ProgressBar as LayaProgressBar } from 'laya/laya/ui/ProgressBar';
import { TextInput as LayaTextInput } from 'laya/laya/ui/TextInput';
import { Text as LayaText } from 'laya/laya/display/Text';
import { FontClip as LayaFontClip } from 'laya/laya/ui/FontClip';
import { TextArea as LayaTextArea } from 'laya/laya/ui/TextArea';
import { HTMLDivElement as LayaHTMLDivElement } from 'laya/laya/html/dom/HTMLDivElement';
import { Sprite as LayaSprite } from 'laya/laya/display/Sprite';
import { Animation as LayaAnimation } from 'laya/laya/display/Animation';
import { Templet as LayaTemplet } from 'laya/laya/ani/bone/Templet';
import { Skeleton as LayaSkeleton } from 'laya/laya/ani/bone/Skeleton';
import { Node as LayaNode } from 'laya/laya/display/Node';
import { View as LayaView } from 'laya/laya/ui/View';
import { Dialog as LayaDialog } from 'laya/laya/ui/Dialog';
import { Scene as LayaScene } from 'laya/laya/display/Scene';

export type ExtraProps = {
    var?: string;
    renderType?: string;
    editorInfo?: string;
};

export interface EventProps {
    onMouseOver?(evt: Event): void;
    onMouseMove?(evt: Event): void;
    onMouseOut?(evt: Event): void;
    onMouseEnter?(evt: Event): void;
    onMouseLeave?(evt: Event): void;
    onMouseDown?(evt: Event): void;
    onMouseUp?(evt: Event): void;
    onWheel?(evt: Event): void;
    onClick?(evt: Event): void;
    onRightClick?(evt: Event): void;
    onDoubleClick?(evt: Event): void;
    onTouchStart?(evt: Event): void;
    onTouchMove?(evt: Event): void;
    onTouchEnd?(evt: Event): void;
    onDragStart?(evt: Event): void;
    onDragMove?(evt: Event): void;
    onDragEnd?(evt: Event): void;
    onDragEnd?(evt: Event): void;
    onResize?(evt: Event): void;
}
type PropsOf<T> = { [P in keyof T]?: T[P] };
export declare class LayaCom<T> extends React.Component<
    PropsOf<T> & EventProps & ExtraProps
> {
    getPublicInstance(): T;
}

export declare class Stage extends LayaCom<LayaStage> {}
export declare class View extends LayaCom<LayaView> {}
export declare class Node extends LayaCom<LayaNode> {}
export declare class Label extends LayaCom<LayaLabel> {}
export declare class Box extends LayaCom<LayaBox> {}
export declare class Button extends LayaCom<LayaButton> {}
export declare class HBox extends LayaCom<LayaHBox> {}
export declare class VBox extends LayaCom<LayaVBox> {}
export declare class Image extends LayaCom<LayaImage> {}
export declare class Clip extends LayaCom<LayaClip> {}
export declare class ComboBox extends LayaCom<LayaComboBox> {}
export declare class Tab extends LayaCom<LayaTab> {}
export declare class HScrollBar extends LayaCom<LayaHScrollBar> {}
export declare class HSlider extends LayaCom<LayaHSlider> {}
export declare class List extends LayaCom<LayaList> {}
export declare class CheckBox extends LayaCom<LayaCheckBox> {}
export declare class RadioGroup extends LayaCom<LayaRadioGroup> {}
export declare class Radio extends LayaCom<LayaRadio> {}
export declare class Panel extends LayaCom<LayaPanel> {}
export declare class ProgressBar extends LayaCom<LayaProgressBar> {}
export declare class TextInput extends LayaCom<LayaTextInput> {}
export declare class Text extends LayaCom<LayaText> {}
export declare class FontClip extends LayaCom<LayaFontClip> {}
export declare class Sprite extends LayaCom<LayaSprite> {}
export declare class TextArea extends LayaCom<LayaTextArea> {}
export declare class HTMLDivElement extends LayaCom<LayaHTMLDivElement> {}
export declare class Animation extends LayaCom<LayaAnimation> {}
export declare class Templet extends LayaCom<LayaTemplet> {}
export declare class Skeleton extends LayaCom<LayaSkeleton> {}
export declare class SkeletonPlayer extends LayaCom<LayaSkeleton> {}
export declare class Dialog extends LayaCom<LayaDialog> {}
export declare class Scene extends LayaCom<LayaScene> {}
