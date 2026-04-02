export type * from "../internal-types";
import { AsyncLocalStorage } from "async_hooks";
import { RuntimeAsyncDeadlockError, RuntimeError } from "../errors/index.js";

export async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const context = new AsyncLocalStorage<number>();

let nextId = 1;

function getContextId(): number {
    let id = context.getStore();
    if (id === undefined) {
        id = nextId++;
        context.enterWith(id);
    }
    return id;
}

export class AsyncLock {
    private midhold: boolean;
    private owner: number;
    private locked: boolean;
    private waiters: Array<() => void>;
    private holdCount: number;
    private name: string;
    
    private constructor() {
        throw new RuntimeError("JSTOOLS: Attempted to call AsyncLock's constructor. The correct way of creating an AsyncLock is via `await AsyncLock.new()`.");
    };

    static async new(name: string, disallowReentrancy: boolean = false): Promise<AsyncLock> {
        const n = Object.create(AsyncLock.prototype) as AsyncLock;
        n.midhold = false;
        n.owner = -1;
        n.waiters = new Array();
        n.locked = disallowReentrancy;
        n.holdCount = 0;
        n.name = name;
        return n as AsyncLock;
    }

    acquire(): Promise<void> {
        const asyncId = getContextId();

        if (this.midhold === false) {
            this.midhold = true;
            this.owner = asyncId;
            this.holdCount++;
            return new Promise((resolve) => resolve());
        } else if (this.midhold === true && this.owner === asyncId && this.locked === false) {
            this.owner = asyncId;
            this.holdCount++;
            return new Promise((resolve) => resolve());
        } else if (this.midhold === true && this.owner === asyncId && this.locked === true) {
            // Attempted reentry when reentry is disallowed
            throw new RuntimeAsyncDeadlockError(`JSTOOLS:AsyncLock(${this.name})   Attempted reentry to lock when reentry is disallowed.`);
        }

        const p: Promise<void> = new Promise((resolve) => {
            this.waiters.push(() => {
                this.owner = asyncId;
                this.holdCount++;
                resolve();
                return null;
            });
            return null;
        });
        return p;
    }

    release(): null {
        this.holdCount--;
        if (this.holdCount === 0) {
            const p = this.waiters.shift();
            if (p === undefined) {
                this.owner = -1;
                this.midhold = false;
                return null;
            }
            p();
        }
        return null;
    }
}

export const getAsyncContextId: () => number = getContextId;
