import { createEle } from './createEle';
import { shallowDiff, initNodeProps, updateNodeProps } from './applyNodeProps';
import { patchFiberToNode } from './devTool';

export const HostConfig = {
    now: Date.now,
    getRootHostContext(rootContainerInstance) {
        return rootContainerInstance.constructor.name;
    },
    getChildHostContext: (parentContext, fiberType, rootInstance) => {
        return { namespace: fiberType, ancestorInfo: () => {} };
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
        fiberNode,
    ) => {
        const element = createEle(type);
        patchFiberToNode(element, fiberNode);
        return element;
    },
    /** 所有子类dom创建完成 正式添加到dom中之前 */
    finalizeInitialChildren: (element, type, props) => {
        initNodeProps(element, props);
        return false;
    },
    prepareForCommit: () => {
        return null;
    },
    resetAfterCommit: () => {},
    supportsMutation: true,
    commitMount: (element, type, newProps, fiberNode) => {},
    prepareUpdate: (
        element,
        type,
        oldProps,
        newProps,
        rootContainerInstance,
        fiberNode,
    ) => {
        return shallowDiff(oldProps, newProps);
    },
    commitUpdate(element, updatePayload, type, oldProps, newProps, fiberNode) {
        updateNodeProps(element, newProps, oldProps, updatePayload);
        patchFiberToNode(element, fiberNode);
        return;
    },
    appendInitialChild: (parent, child) => {
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
    removeChild: (parentInstance, child) => {
        parentInstance.removeChild(child);
        patchFiberToNode(child, null);
    },
    removeChildFromContainer: (container, child) => {
        patchFiberToNode(child, null);
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
