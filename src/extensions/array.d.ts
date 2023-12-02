interface Array<T> {
  sum(this: number[]): number;
  product(this: number[]): number;
  max(this: number[]): number;
  min(this: number[]): number;
  toInts(this: string[]): number[];
  mapNonNull<T, K>(this: T[], callbackfn: (T) => K | null): K[];
  groupedBy<T, K extends string | number | symbol>(
    this: T[],
    keyFunc: (item: T) => K
  ): Record<K, T[]>;
  groupedBy<T, K extends string | number | symbol, V>(
    this: T[],
    keyFunc: (item: T) => K,
    valFunc: (item: T) => V
  ): Record<K, V[]>;
  look(this: T[], func?: (item: T) => void): T[];
  transposed<T extends Array<any>>(this: T[]): T[];
}
