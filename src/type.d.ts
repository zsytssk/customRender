type FuncVoid = () => void;
type Point = {
    x: number;
    y: number;
};

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
    ? 1
    : 2) extends (<T>() => T extends Y ? 1 : 2)
    ? A
    : B;

type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<
        { [Q in P]: T[P] },
        { -readonly [Q in P]: T[P] },
        P
    >;
}[keyof T];

type ReadonlyKeys<T> = {
    [P in keyof T]-?: IfEquals<
        { [Q in P]: T[P] },
        { -readonly [Q in P]: T[P] },
        never,
        P
    >;
}[keyof T];

type NoReadOnlyProps<T> = Pick<T, WritableKeys<T>>;
type B<T> = Readonly<T>;
