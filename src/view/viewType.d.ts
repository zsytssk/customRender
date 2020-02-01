type ComProps = {
    x?: number;
    y?: number;
    visible?: boolean;
    var?: string;
    name?: string;
    children?: JSX.Element[];
};

type CtorJSXEle = (...args) => JSX.Element;
