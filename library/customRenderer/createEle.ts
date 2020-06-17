import { Box } from 'laya/ui/Box';
import { Label } from 'laya/ui/Label';
import { Button } from 'laya/ui/Button';
import { HBox } from 'laya/ui/HBox';
import { VBox } from 'laya/ui/VBox';
import { Image } from 'laya/ui/Image';
import { Clip } from 'laya/ui/Clip';
import { ComboBox } from 'laya/ui/ComboBox';
import { Tab } from 'laya/ui/Tab';
import { HScrollBar } from 'laya/ui/HScrollBar';
import { HSlider } from 'laya/ui/HSlider';
import { List } from 'laya/ui/List';
import { RadioGroup } from 'laya/ui/RadioGroup';
import { Radio } from 'laya/ui/Radio';
import { Panel } from 'laya/ui/Panel';
import { ProgressBar } from 'laya/ui/ProgressBar';
import { TextInput } from 'laya/ui/TextInput';
import { FontClip } from 'laya/ui/FontClip';
import { Sprite } from 'laya/display/Sprite';
import { TextArea } from 'laya/ui/TextArea';
import { Skeleton } from 'laya/ani/bone/Skeleton';
import { Templet } from 'laya/ani/bone/Templet';
import { Dialog } from 'laya/ui/Dialog';
import { Scene } from 'laya/display/Scene';
import { View } from 'laya/ui/View';
import { HTMLDivElement } from 'laya/html/dom/HTMLDivElement';

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
    console.log(`test:>`, type);
}
