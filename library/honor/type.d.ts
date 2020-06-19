type FuncVoid = () => void;
type Func<T> = (...params: any[]) => T;
type NotFunc<T> = T extends Function ? never : T;

type Ctor<T> = new (...param: any[]) => T;

type AnyObj = {
    [key: string]: any;
};

type ObjFilterFlags<T, Condition> = {
    [k in keyof T]: T[k] extends Condition ? k : never;
};
type ObjFilterKeys<Base, Condition> = ObjFilterFlags<
    Base,
    Condition
>[keyof Base];

type ObjFilter<Base, Condition> = Pick<Base, ObjFilterKeys<Base, Condition>>;
