import { Box } from 'laya/laya/ui/Box';
import { Label } from 'laya/laya/ui/Label';

export function createEle(type) {
    if (type === 'Box') {
        return new Box();
    }
    if (type === 'Label') {
        return new Label();
    }
}
