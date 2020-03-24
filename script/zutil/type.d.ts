type FuncVoid = (...args: any[]) => void;
type Func<T> = (...args: any[]) => T;
type FuncListener = (data: AnyObj) => void;
type AnyObj = { [x: string]: any };
type ValOfObj<T> = T[keyof T];
type PartialAll<T, U> = {
    [p in keyof (T & U)]: p extends keyof T
        ? T[p]
        : p extends keyof U
        ? U[p]
        : never;
};
type Point = {
    x: number;
    y: number;
};
declare module '*.json' {
    const value: any;
    export default value;
}

/** 抽取class的属性... */
type ClassProp<T, K extends keyof T> = T[K];
type ClassMethod<T> = { [k in keyof T]: T[k] extends Function ? T[k] : never };
type ClassMethodName<T> = { [k in keyof T]: T[k] extends Function ? k : never };
type Ctor<T> = new (...args) => T;

declare module 'imagemin';
declare module 'imagemin-mozjpeg';
declare module 'imagemin-pngquant';
