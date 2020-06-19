import Reconciler from 'react-reconciler';
import { HostConfig } from './hostConfig';
export * from './layaCom';

const reconcilerInstance = Reconciler(HostConfig as any);

reconcilerInstance.injectIntoDevTools({
    bundleType: process.env.NODE_ENV !== 'production' ? 1 : 0,
    version: '16.13.1',
    rendererPackageName: 'react-laya',
    findFiberByHostInstance: (...args: any[]) => {
        alert(1);
        console.log(args);
    },
    getInspectorDataForViewTag: (...args: any[]) => {
        alert(1);
        console.log(args);
    },
});

export const CustomRenderer = {
    render(element, renderDom?, callback?) {
        // element: This is the react element for App component
        // renderDom: This is the host root element to which the rendered app will be attached.
        // callback: if specified will be called after render is done.

        console.log(arguments);
        const container = reconcilerInstance.createContainer(
            renderDom,
            false,
            false,
        ); // Creates root fiber node.

        reconcilerInstance.updateContainer(element, container, null, callback); // Start reconcilation and render the result
    },
};
