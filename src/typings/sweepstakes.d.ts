interface NodeRequireFunction {
    (modules: string[], callback?: (...args) => any);
    config(options: any);
}