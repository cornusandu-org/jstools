import type { HexString } from "../internal-types";

export const int = Object.freeze({
    toString: function (n?: number): string | "(undefined)" | "(math.inf)" | "-(math.inf)" | "NaN" {
        if (n === undefined) return "(undefined)"
        if (n === Infinity) return "(math.inf)";
        if (n === -Infinity) return "-(math.inf)";
        if (Number.isNaN(n)) return "NaN";
        return String(n);
    },
    toHex: function (n: number | typeof NaN, signed: boolean = false): HexString | "0xinf" | "-0xinf" | "NaN" {
        const orig = n;
        if (n === Infinity) return "0xinf";
        if (n === -Infinity) return "-0xinf";
        if (Number.isNaN(n)) return "NaN";
        if (!Number.isInteger(n)) {
            n = Math.trunc(n);
        }
        if (n < 0 && signed === false) {
            n = n >>> 0;
        }
        let h = Math.abs(n).toString(16).toUpperCase();
        h = h.padStart(h.length <= 2 ? 2 : h.length <= 4 ? 4 : h.length <= 8 ? 8 : h.length <= 16 ? 16 : Math.ceil(h.length / 8) * 8, "0");
        h = "0x" + h;
        if (signed === true && n < 0) {
            return "-" + h as HexString;
        }
        return h as HexString;
    }
} as const);

export const hex = Object.freeze({
    toInt: function (h?: HexString): number {
        if (h === undefined) return NaN;
        if (h as string === "NaN") return NaN;
        if (h as string === "0xinf") return Infinity;
        if (h as string === "-0xinf") return -Infinity;

        let sign = 1;
        if (h.startsWith("-")) {
            sign = -1;
            h = h.slice(1) as HexString;
        }

        const n = parseInt(h as string, 16);
        return sign * n;
    },
    toIntAsString: function (h?: HexString): string | "(undefined)" | "(math.inf)" | "-(math.inf)" | "NaN" {
        if (h === undefined) return "(undefined)";
        return int.toString(this.toInt(h));
    },
    asString: function (h?: HexString): string | "(undefined)" {
        if (h === undefined) return "(undefined)";
        return h as string;
    }
} as const);


export function getUndefined(): undefined {
    return void 0;
}
