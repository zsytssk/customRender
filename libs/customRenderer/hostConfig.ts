import { createEle } from './createEle';
import { applyNodeProps } from './applyNodeProps';

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
        // console.log('prepareForCommit', ...args);
    },
    resetAfterCommit: (...args) => {
        // console.log('resetAfterCommit', ...args);
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
    prepareUpdate: function(
        instance,
        type,
        oldProps,
        newProps,
        rootContainerInstance,
        currentHostContext,
    ) {
        return {}; //return nothing.
    },
    commitUpdate: function(
        instance,
        updatePayload,
        type,
        oldProps,
        newProps,
        finishedWork,
    ) {
        applyNodeProps(instance, newProps, oldProps);
        return; //return nothing.
    },
    commitTextUpdate: function(textInstance, oldText, newText) {
        textInstance.nodeValue = newText;
    },
    insertBefore: (parentInstance, child, beforeChild) => {
        parentInstance.insertBefore(child, beforeChild);
    },
    removeChild: function(parentInstance, child) {
        parentInstance.removeChild(child);
    },
    insertInContainerBefore: function(container, child, beforeChild) {
        container.insertBefore(child, beforeChild);
    },
    removeChildFromContainer: function(container, child) {
        container.removeChild(child);
    },
    shouldDeprioritizeSubtree: function(type, nextProps) {
        return !!nextProps.hidden;
    },
};
