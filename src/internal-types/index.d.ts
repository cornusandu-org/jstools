export type HexString = `0x${string}` & { __brand: 'hexstring' };
export type Nullable<T> = T | null;
