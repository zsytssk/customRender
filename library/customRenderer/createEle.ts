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
    let ele;
    if (type === 'Box') {
        ele = new Box();
        ele.type = Box;
    }
    if (type === 'Scene') {
        ele = new Scene();
    }
    if (type === 'View') {
        ele = new View();
    }
    if (type === 'Label') {
        ele = new Label();
    }
    if (type === 'Button') {
        ele = new Button();
    }
    if (type === 'HBox') {
        ele = new HBox();
    }
    if (type === 'VBox') {
        ele = new VBox();
    }
    if (type === 'Image') {
        ele = new Image();
    }
    if (type === 'Clip') {
        ele = new Clip();
    }
    if (type === 'ComboBox') {
        ele = new ComboBox();
    }
    if (type === 'Tab') {
        ele = new Tab();
    }
    if (type === 'HScrollBar') {
        ele = new HScrollBar();
    }
    if (type === 'HSlider') {
        ele = new HSlider();
    }
    if (type === 'List') {
        ele = new List();
    }
    if (type === 'RadioGroup') {
        ele = new RadioGroup();
    }
    if (type === 'Radio') {
        ele = new Radio();
    }
    if (type === 'Panel') {
        ele = new Panel();
    }
    if (type === 'ProgressBar') {
        ele = new ProgressBar();
    }
    if (type === 'TextInput') {
        ele = new TextInput();
    }
    if (type === 'Text') {
        ele = new Text();
    }
    if (type === 'Dialog') {
        ele = new Dialog();
    }
    if (type === 'FontClip') {
        ele = new FontClip();
    }
    if (type === 'Sprite') {
        ele = new Sprite();
    }
    if (type === 'TextArea') {
        ele = new TextArea();
    }
    if (type === 'HTMLDivElement') {
        ele = new HTMLDivElement();
    }
    if (type === 'Animation') {
        ele = new Animation();
    }
    if (type === 'SkeletonPlayer') {
        ele = new Skeleton();
    }
    if (type === 'Skeleton') {
        ele = new Skeleton();
    }
    if (type === 'Templet') {
        ele = new Templet();
    }
    return ele;
}
