type ComProps = {
    x?: number;
    y?: number;
    visible?: boolean;
    var?: string;
    name?: string;
    children?: React.ReactNode[];
};

type CtorJSXEle = (...args) => JSX.Element;
