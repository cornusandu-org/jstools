export type HexString = `0x${string}` & { __brand: 'hexstring' };
export type OctalString = `0o${string}` & { __brand: 'octalstring' };
export type Empty = null | undefined | void;
export type Optional<T> = (T & {__brand: "optional"}) | Empty;
