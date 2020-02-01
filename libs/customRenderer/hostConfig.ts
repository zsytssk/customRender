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
        for (const key in newProps) {
            element[key] = newProps[key];
        }

        return element;
    },
    appendInitialChild: (parent, child) => {
        if (child.parent === parent) {
            return;
        }
        parent.addChild(child);
    },
    /** 所有子类dom创建完成 正式添加到dom中之前 */
    finalizeInitialChildren: (element, type, props) => {
        initNodeProps(element, props);
        return false;
    },
    prepareForCommit: () => {},
    resetAfterCommit: () => {},
    supportsMutation: true,
    commitMount: (element, type, newProps, fiberNode) => {
        element.focus();
    },
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
    commitTextUpdate: (textInstance, oldText, newText) => {
        throw new Error(`don't support text`);
    },
    insertBefore: (parent, child, beforeChild) => {
        const index = parent.getChildIndex(beforeChild);
        if (index !== -1) {
            parent.addChildAt(child, index);
        } else {
            parent.addChild(child);
        }
    },
    removeChild: (parentInstance, child) => {
        parentInstance.removeChild(child);
    },
    insertInContainerBefore: (parent, child, beforeChild) => {
        const index = parent.getChildIndex(beforeChild);
        if (index !== -1) {
            parent.addChildAt(child, index);
        } else {
            parent.addChild(child);
        }
    },
    appendChild: (parent, child) => {
        if (child.parent === parent) {
            return;
        }
        parent.addChild(child);
    },
    appendChildToContainer: (parent, child) => {
        if (child.parent === parent) {
            return;
        }
        parent.addChild(child);
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
};
