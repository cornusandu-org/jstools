function stringRemovePrefix(str: string, prefix: string) {
    if (stringHasPrefix(str, prefix))
        return str.slice(prefix.length, str.length);
    return str;
}

function stringRemovePrefixUnsafe(str: string, prefix: string) {
    return str.slice(prefix.length, str.length);
}

function stringHasPrefix(str: string, prefix: string) {
    return strcmp(str.slice(0, prefix.length), prefix) === 0;
}

function stringRemoveSuffix(str: string, suffix: string) {
    if (stringHasSuffix(str, suffix))
        return stringRemoveSuffixUnsafe(str, suffix);
    return str;
}

function stringRemoveSuffixUnsafe(str: string, suffix: string) {
    return str.slice(0, str.length - suffix.length);
}

function stringHasSuffix(str: string, suffix: string) {
    return strcmp(str.slice(str.length - suffix.length, str.length), suffix) === 0;
}

function strcmp(a: string, b: string) {
    for (let i = 0; i < a.length && i < b.length; ++i) {
        if (a[i]! < b[i]!)
            return 1;
        if (a[i]! > b[i]!)
            return -1;
    }
    if (a.length < b.length)
        return 1;
    if (a.length > b.length)
        return -1;
    return 0;
}


export const stringTransform = Object.freeze({
    prefix: {
        removePrefix: stringRemovePrefix,
        removePrefixUnsafe: stringRemovePrefixUnsafe,
        hasPrefix: stringHasPrefix
    },
    suffix: {
        removeSuffix: stringRemoveSuffix,
        removeSuffixUnsafe: stringRemoveSuffixUnsafe,
        hasSuffix: stringHasSuffix
    },
    strcmp: strcmp
});
