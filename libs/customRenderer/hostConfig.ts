import { createEle } from './createEle';
import { applyNodeProps } from './applyNodeProps';
import { Box } from 'laya/laya/ui/Box';

export const HostConfig = {
    now: Date.now,
    getRootHostContext: (...args) => {
        const rootContext = {};
        return rootContext;
    },
    getChildHostContext: (...args) => {
        const context = {};
        return context;
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
        applyNodeProps(element, newProps);
        return element;
    },
    appendInitialChild: (parent, child) => {
        if (child.parent === parent) {
            return;
        }
        parent.addChild(child);
    },
    finalizeInitialChildren: (...args) => {
        return false;
    },
    prepareForCommit: (...args) => {
        console.log('prepareForCommit', ...args);
    },
    resetAfterCommit: (...args) => {
        console.log('resetAfterCommit', ...args);
    },
    appendChildToContainer: (parent, child) => {
        if (child.parent === parent) {
            return;
        }
        parent.addChild(child);
    },
    supportsMutation: true,
    commitMount: (domElement, type, newProps, fiberNode) => {
        domElement.focus();
    },
    prepareUpdate: (
        instance,
        type,
        oldProps,
        newProps,
        rootContainerInstance,
        currentHostContext,
    ) => {
        return {}; //return nothing.
    },
    commitUpdate: (
        instance,
        updatePayload,
        type,
        oldProps,
        newProps,
        finishedWork,
    ) => {
        applyNodeProps(instance, newProps, oldProps);
        return; //return nothing.
    },
    commitTextUpdate: (textInstance, oldText, newText) => {
        textInstance.nodeValue = newText;
    },
    insertBefore: (parentInstance, child, beforeChild) => {
        parentInstance.insertBefore(child, beforeChild);
    },
    removeChild: (parentInstance, child) => {
        parentInstance.removeChild(child);
    },
    insertInContainerBefore: (container: Box, child, beforeChild) => {
        const index = container.getChildIndex(beforeChild);
        if (index !== -1) {
            container.addChildAt(child, index);
        } else {
            container.addChild(child);
        }
    },
    removeChildFromContainer: (container, child) => {
        container.removeChild(child);
    },
    shouldDeprioritizeSubtree: (type, nextProps) => {
        return !!nextProps.hidden;
    },
    getPublicInstance(instance) {
        return instance;
    },
};
