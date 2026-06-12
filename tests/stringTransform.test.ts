import { describe, expect, test } from 'vitest';
import { stringTransform } from '../src/string/index.transform';

describe('stringTransform.prefix', () => {
    test('detects prefix', () => {
        expect(stringTransform.prefix.hasPrefix('file.mp4', 'file')).toBe(true);
        expect(stringTransform.prefix.hasPrefix('file.mp4', 'mp4')).toBe(false);
        expect(stringTransform.prefix.hasPrefix('file.mp4', '')).toBe(true);
    });

    test('removes prefix when present', () => {
        expect(stringTransform.prefix.removePrefix('file.mp4', 'file.')).toBe('mp4');
    });

    test('keeps string unchanged when prefix is missing', () => {
        expect(stringTransform.prefix.removePrefix('file.mp4', 'otherFile.')).toBe('file.mp4');
    });

    test('unsafe prefix removal always slices', () => {
        expect(stringTransform.prefix.removePrefixUnsafe('file.mp4', 'file.')).toBe('mp4');
        expect(stringTransform.prefix.removePrefixUnsafe('file.mp4', '.mp4')).toBe('.mp4');
        expect(stringTransform.prefix.removePrefixUnsafe('file.mp4', 'otherFile.')).toBe('');
    });
});

describe('stringTransform.suffix', () => {
    test('detects suffix', () => {
        expect(stringTransform.suffix.hasSuffix('file.mp4', '.mp4')).toBe(true);
        expect(stringTransform.suffix.hasSuffix('file.mp4', 'file.')).toBe(false);
        expect(stringTransform.suffix.hasSuffix('file.mp4', '')).toBe(true);
    });

    test('removes suffix when present', () => {
        expect(stringTransform.suffix.removeSuffix('file.mp4', '.mp4')).toBe('file');
    });

    test('keeps string unchanged when suffix is missing', () => {
        expect(stringTransform.suffix.removeSuffix('file.mp4', '.png')).toBe('file.mp4');
    });

    test('unsafe suffix removal always slices', () => {
        expect(stringTransform.suffix.removeSuffixUnsafe('file.mp4', '.mp4')).toBe('file');
        expect(stringTransform.suffix.removeSuffixUnsafe('file.paint', '.mp4')).toBe('file.p');
    });
});

describe('stringTransform.strcmp', () => {
    test('compares equal strings', () => {
        expect(stringTransform.strcmp('stringA0 \0', 'stringA0 \0')).toBe(0);
    });

    test('compares smaller and larger strings', () => {
        expect(stringTransform.strcmp('stringA0 \x02', 'stringA0 \x01')).toBe(-1);
        expect(stringTransform.strcmp('stringA0', 'stringA1')).toBe(1);
    });

    test('compares by length after shared prefix', () => {
        expect(stringTransform.strcmp('abc', 'abcd')).toBe(1);
        expect(stringTransform.strcmp('abcd', 'abc')).toBe(-1);
    });
});
