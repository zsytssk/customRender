import Reconciler from 'react-reconciler';
import { HostConfig } from './hostConfig';
export * from './layaCom';
import { injectDevTool, initDevTool } from './devTool';

const reconcilerInstance = Reconciler(HostConfig as any);

export const CustomRenderer = {
    render(element, renderDom?, callback?) {
        initDevTool(reconcilerInstance);

        const container = reconcilerInstance.createContainer(
            renderDom,
            false,
            false,
        ); // Creates root fiber node.

        reconcilerInstance.updateContainer(element, container, null, callback); // Start reconcilation and render the result
    },
};
