interface Object {
    entries(this): [key, value][]
    let<T, K>(this: T, func: (arg: T) => K): K
    also<T, K>(this: T, func: (arg: T) => K): T
}