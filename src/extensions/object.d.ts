interface Object {
    entries<T>(this: { [s: string]: T }): [string, T][]
    let<T, K>(this: T, func: (arg: T) => K): K
    also<T, K>(this: T, func: (arg: T) => K): T
}