export interface Component {
    destroy?(): void;
}

export class ComponentManager {
    public destroyed = false;
    private components: Set<Component> = new Set();
    public addCom(...com_list: Component[]) {
        for (const com of com_list) {
            this.components.add(com);
        }
    }
    public delCom(...com_list: Component[]) {
        for (const com of com_list) {
            this.components.delete(com);
        }
    }
    public getCom<T extends Component>(ctor: Ctor<T>): T {
        for (const com of this.components) {
            if (com instanceof ctor) {
                return com;
            }
        }
    }
    public destroy() {
        for (const com of this.components) {
            if (typeof com.destroy === 'function') {
                com.destroy();
            }
        }
        this.components.clear();
        this.destroyed = true;
    }
}
