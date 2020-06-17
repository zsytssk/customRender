const propsToSkip = { children: true, ref: true, key: true, style: true };

export function shallowDiff(oldObj: {}, newObj: {}) {
    const uniqueProps = new Set([
        ...Object.keys(oldObj),
        ...Object.keys(newObj),
    ]);
    const changedProps = Array.from(uniqueProps).filter(
        propName => oldObj[propName] !== newObj[propName],
    );

    return changedProps;
}

export function initNodeProps(instance, props) {
    for (const key in props) {
        if (propsToSkip[key]) {
            continue;
        }
        const is_event = isEvent(key);
        if (!is_event) {
            instance[key] = props[key];
            continue;
        }
        const eventName = key.substr(2).toLowerCase();
        if (props[key]) {
            instance.on(eventName, instance, props[key]);
        }
    }
}
export function updateNodeProps(
    instance,
    newProps,
    oldProps,
    changeKeys: string[],
) {
    for (const key of changeKeys) {
        if (propsToSkip[key]) {
            continue;
        }
        const is_event = isEvent(key);
        if (!is_event) {
            instance[key] = newProps[key];
            continue;
        }
        const eventName = key.substr(2).toLowerCase();
        if (oldProps[key]) {
            instance.off(eventName, instance, oldProps[key]);
        }
        instance.on(eventName, instance, newProps[key]);
    }
}

function isEvent(name: string) {
    return name.slice(0, 2) === 'on';
}
