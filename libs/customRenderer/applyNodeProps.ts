const propsToSkip = { children: true, ref: true, key: true, style: true };

export function applyNodeProps(instance, props, oldProps = {}) {
    const updatedProps = {};
    let hasUpdates = false;
    for (const key in oldProps) {
        if (propsToSkip[key]) {
            continue;
        }
        const isEvent = key.slice(0, 2) === 'on';
        const propChanged = oldProps[key] !== props[key];
        if (isEvent && propChanged) {
            let eventName = key.substr(2).toLowerCase();
            if (eventName.substr(0, 7) === 'content') {
                eventName =
                    'content' +
                    eventName.substr(7, 1).toUpperCase() +
                    eventName.substr(8);
            }
            instance.off(eventName, instance, oldProps[key]);
        }
        const toRemove = !props.hasOwnProperty(key);
        if (toRemove) {
            instance[key] = undefined;
        }
    }
    for (const key in props) {
        if (propsToSkip[key]) {
            continue;
        }
        const isEvent = key.slice(0, 2) === 'on';
        const toAdd = oldProps[key] !== props[key];
        if (isEvent && toAdd) {
            let eventName = key.substr(2).toLowerCase();
            if (eventName.substr(0, 7) === 'content') {
                eventName =
                    'content' +
                    eventName.substr(7, 1).toUpperCase() +
                    eventName.substr(8);
            }
            if (props[key]) {
                instance.on(eventName, instance, props[key]);
            }
        }
        if (
            !isEvent &&
            (props[key] !== oldProps[key] || props[key] !== instance[key])
        ) {
            hasUpdates = true;
            updatedProps[key] = props[key];
        }
    }

    if (hasUpdates) {
        setAttrs(instance, updatedProps);
    }
}

function setAttrs(instance, props) {
    for (let key in props) {
        instance[key] = props[key];
    }
}
