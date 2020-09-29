import React from 'react';
import { Box as LayaBox } from 'laya/ui/Box';
import { Event } from 'laya/events/Event';
import { Label as LayaLabel } from 'laya/ui/Label';
import { Stage as LayaStage } from 'laya/display/Stage';
import { Button as LayaButton } from 'laya/ui/Button';
import { HBox as LayaHBox } from 'laya/ui/HBox';
import { VBox as LayaVBox } from 'laya/ui/VBox';
import { Image as LayaImage } from 'laya/ui/Image';
import { Clip as LayaClip } from 'laya/ui/Clip';
import { ComboBox as LayaComboBox } from 'laya/ui/ComboBox';
import { Tab as LayaTab } from 'laya/ui/Tab';
import { HScrollBar as LayaHScrollBar } from 'laya/ui/HScrollBar';
import { HSlider as LayaHSlider } from 'laya/ui/HSlider';
import { List as LayaList } from 'laya/ui/List';
import { CheckBox as LayaCheckBox } from 'laya/ui/CheckBox';
import { RadioGroup as LayaRadioGroup } from 'laya/ui/RadioGroup';
import { Radio as LayaRadio } from 'laya/ui/Radio';
import { Panel as LayaPanel } from 'laya/ui/Panel';
import { ProgressBar as LayaProgressBar } from 'laya/ui/ProgressBar';
import { TextInput as LayaTextInput } from 'laya/ui/TextInput';
import { Text as LayaText } from 'laya/display/Text';
import { FontClip as LayaFontClip } from 'laya/ui/FontClip';
import { TextArea as LayaTextArea } from 'laya/ui/TextArea';
import { HTMLDivElement as LayaHTMLDivElement } from 'laya/html/dom/HTMLDivElement';
import { Sprite as LayaSprite } from 'laya/display/Sprite';
import { Animation as LayaAnimation } from 'laya/display/Animation';
import { Templet as LayaTemplet } from 'laya/ani/bone/Templet';
import { Skeleton as LayaSkeleton } from 'laya/ani/bone/Skeleton';
import { Node as LayaNode } from 'laya/display/Node';
import { View as LayaView } from 'laya/ui/View';
import { Dialog as LayaDialog } from 'laya/ui/Dialog';
import { Scene as LayaScene } from 'laya/display/Scene';

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

export type LayaCom<T> = (
    props:
        | PropsOf<T>
        | EventProps
        | ExtraProps
        | { ref: React.MutableRefObject<T> },
) => JSX.Element;

export declare let Stage: LayaCom<LayaStage>;
export declare let View: LayaCom<LayaView>;
export declare let Node: LayaCom<LayaNode>;
export declare let Label: LayaCom<LayaLabel>;
export declare let Box: LayaCom<LayaBox>;
export declare let Button: LayaCom<LayaButton>;
export declare let HBox: LayaCom<LayaHBox>;
export declare let VBox: LayaCom<LayaVBox>;
export declare let Image: LayaCom<LayaImage>;
export declare let Clip: LayaCom<LayaClip>;
export declare let ComboBox: LayaCom<LayaComboBox>;
export declare let Tab: LayaCom<LayaTab>;
export declare let HScrollBar: LayaCom<LayaHScrollBar>;
export declare let HSlider: LayaCom<LayaHSlider>;
export declare let List: LayaCom<LayaList>;
export declare let CheckBox: LayaCom<LayaCheckBox>;
export declare let RadioGroup: LayaCom<LayaRadioGroup>;
export declare let Radio: LayaCom<LayaRadio>;
export declare let Panel: LayaCom<LayaPanel>;
export declare let ProgressBar: LayaCom<LayaProgressBar>;
export declare let TextInput: LayaCom<LayaTextInput>;
export declare let Text: LayaCom<LayaText>;
export declare let FontClip: LayaCom<LayaFontClip>;
export declare let Sprite: LayaCom<LayaSprite>;
export declare let TextArea: LayaCom<LayaTextArea>;
export declare let HTMLDivElement: LayaCom<LayaHTMLDivElement>;
export declare let Animation: LayaCom<LayaAnimation>;
export declare let Templet: LayaCom<LayaTemplet>;
export declare let Dialog: LayaCom<LayaDialog>;
export declare let Scene: LayaCom<LayaScene>;
export declare let SkeletonPlayer: LayaCom<LayaSkeleton>;
