import { createEle } from './createEle';
import { shallowDiff, initNodeProps, updateNodeProps } from './applyNodeProps';

export const HostConfig = {
    now: Date.now,
    getRootHostContext: (...args) => {
        const rootContext = {};
        return rootContext;
    },
    getChildHostContext: (parentContext, fiberType, rootInstance) => {
        return {};
    },
    shouldSetTextContent: (type, nextProps) => {
        return false;
    },
    createTextInstance: (
        newText,
        rootContainerInstance,
        currentHostContext,
        workInProgress,
    ) => {
        return;
    },
    createInstance: (
        type,
        newProps,
        rootContainerInstance,
        currentHostContext,
        workInProgress,
    ) => {
        const element = createEle(type);
        return element;
    },
    /** 所有子类dom创建完成 正式添加到dom中之前 */
    finalizeInitialChildren: (element, type, props) => {
        initNodeProps(element, props);
        return false;
    },
    prepareForCommit: () => {},
    resetAfterCommit: () => {},
    supportsMutation: true,
    commitMount: (element, type, newProps, fiberNode) => {},
    prepareUpdate: (
        instance,
        type,
        oldProps,
        newProps,
        rootContainerInstance,
        currentHostContext,
    ) => {
        return shallowDiff(oldProps, newProps);
    },
    commitUpdate(
        instance,
        updatePayload,
        type,
        oldProps,
        newProps,
        finishedWork,
    ) {
        updateNodeProps(instance, newProps, oldProps, updatePayload);
        return; //return nothing.
    },
    appendInitialChild: (parent, child, ...test) => {
        if (child.parent === parent) {
            return;
        }
        parent.addChild(child);
    },
    insertBefore: (parent, child, beforeChild) => {
        const index = parent.getChildIndex(beforeChild);
        if (index !== -1) {
            parent.addChildAt(child, index);
        } else {
            parent.addChild(child);
        }
    },
    insertInContainerBefore: (parent, child, beforeChild, ...test) => {
        const index = parent.getChildIndex(beforeChild);
        if (index !== -1) {
            parent.addChildAt(child, index);
        } else {
            parent.addChild(child);
        }
    },
    appendChild: (parent, child, ...test) => {
        if (child.parent === parent) {
            return;
        }
        parent.addChild(child);
    },
    appendChildToContainer: (parent, child, ...test) => {
        if (child.parent === parent) {
            return;
        }
        parent.addChild(child);
    },
    removeChild: (parentInstance, child) => {
        parentInstance.removeChild(child);
    },
    removeChildFromContainer: (container, child) => {
        container.removeChild(child);
    },
    shouldDeprioritizeSubtree: (type, props) => {
        return !!props.visible;
    },
    getPublicInstance(instance) {
        return instance;
    },
    commitTextUpdate: (textInstance, oldText, newText) => {
        throw new Error(`don't support text`);
    },
};
