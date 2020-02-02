type Ctor<T> = new (...args) => T;
type FuncVoid = () => void;
type Func<T> = (...params: any[]) => T;
