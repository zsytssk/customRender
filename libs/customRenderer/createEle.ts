import { Box } from 'laya/laya/ui/Box';
import { Label } from 'laya/laya/ui/Label';
import { Button } from 'laya/laya/ui/Button';
import { HBox } from 'laya/laya/ui/HBox';
import { VBox } from 'laya/laya/ui/VBox';
import { Image } from 'laya/laya/ui/Image';
import { Clip } from 'laya/laya/ui/Clip';
import { ComboBox } from 'laya/laya/ui/ComboBox';
import { Tab } from 'laya/laya/ui/Tab';
import { HScrollBar } from 'laya/laya/ui/HScrollBar';
import { HSlider } from 'laya/laya/ui/HSlider';
import { List } from 'laya/laya/ui/List';
import { RadioGroup } from 'laya/laya/ui/RadioGroup';
import { Radio } from 'laya/laya/ui/Radio';
import { Panel } from 'laya/laya/ui/Panel';
import { ProgressBar } from 'laya/laya/ui/ProgressBar';
import { TextInput } from 'laya/laya/ui/TextInput';
import { FontClip } from 'laya/laya/ui/FontClip';
import { Sprite } from 'laya/laya/display/Sprite';
import { TextArea } from 'laya/laya/ui/TextArea';
import { Skeleton } from 'laya/laya/ani/bone/Skeleton';
import { Templet } from 'laya/laya/ani/bone/Templet';
import { Dialog } from 'laya/laya/ui/Dialog';
import { Scene } from 'laya/laya/display/Scene';
import { View } from 'laya/laya/ui/View';
import { HTMLDivElement } from 'laya/laya/html/dom/HTMLDivElement';

export function createEle(type) {
    if (type === 'Box') {
        return new Box();
    }
    if (type === 'Scene') {
        return new Scene();
    }
    if (type === 'View') {
        return new View();
    }
    if (type === 'Label') {
        return new Label();
    }
    if (type === 'Button') {
        return new Button();
    }
    if (type === 'HBox') {
        return new HBox();
    }
    if (type === 'VBox') {
        return new VBox();
    }
    if (type === 'Image') {
        return new Image();
    }
    if (type === 'Clip') {
        return new Clip();
    }
    if (type === 'ComboBox') {
        return new ComboBox();
    }
    if (type === 'Tab') {
        return new Tab();
    }
    if (type === 'HScrollBar') {
        return new HScrollBar();
    }
    if (type === 'HSlider') {
        return new HSlider();
    }
    if (type === 'List') {
        return new List();
    }
    if (type === 'RadioGroup') {
        return new RadioGroup();
    }
    if (type === 'Radio') {
        return new Radio();
    }
    if (type === 'Panel') {
        return new Panel();
    }
    if (type === 'ProgressBar') {
        return new ProgressBar();
    }
    if (type === 'TextInput') {
        return new TextInput();
    }
    if (type === 'Text') {
        return new Text();
    }
    if (type === 'Dialog') {
        return new Dialog();
    }
    if (type === 'FontClip') {
        return new FontClip();
    }
    if (type === 'Sprite') {
        return new Sprite();
    }
    if (type === 'TextArea') {
        return new TextArea();
    }
    if (type === 'HTMLDivElement') {
        return new HTMLDivElement();
    }
    if (type === 'Animation') {
        return new Animation();
    }
    if (type === 'SkeletonPlayer') {
        return new Skeleton();
    }
    if (type === 'Skeleton') {
        return new Skeleton();
    }
    if (type === 'Templet') {
        return new Templet();
    }
}
