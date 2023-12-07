interface Array<T> {
  sum(this: number[]): number;
  product(this: number[]): number;
  max(this: number[]): number;
  min(this: number[]): number;
  toInts(this: string[]): number[];
  mapNonNull<T, K>(this: T[], callbackfn: (T, number) => K | null): K[];
  groupedBy<T, K extends string | number | symbol>(
    this: T[],
    keyFunc: (item: T) => K
  ): Record<K, T[]>;
  groupedBy<T, K extends string | number | symbol, V>(
    this: T[],
    keyFunc: (item: T) => K,
    valFunc: (item: T) => V
  ): Record<K, V[]>;
  unique<T>(this: T[]): T[]
  count<T>(this: T[], item: T): number
  count<T>(this: T[], func: (item: T) => boolean): number
  look(this: T[], func?: (item: T) => void): T[];
  transposed<T,K extends Array<T>>(this: K[]): K[];
}
