# jstools
## jstools/async
### AsyncLock
#### AsyncLock.new
**Description**

Create a new AsyncLock with `AsyncLock.new`. Example:
```js
const lock = await AsyncLock.new("myLockName");
```

**Arguments**

| Argument | Type | Description |
| -------- | ---- | ----------- |
| name     | string | The name for the lock (used for error contents) |
| disallowReentry? | boolean (=false) | Whether the same async context can acquire the lock multiple times |

**Type**

```js
class AsyncLock {
static async new(name: string, disallowReentry: boolean = false): AsyncLock {};
}
``` 

#### AsyncLock.acquire
**Description**

Acquire the lock, or wait until it can be acquired. Example:
```js
const lock = await AsyncLock.new("myLockName");
await lock.acquire();
```

**Type**

```js
class AsyncLock {
acquire(): Promise<void> {};
}
```

#### AsyncLock.release
**Description**

Release the lock. Example:
```js
const lock = await AsyncLock.new("myLockName");
await lock.acquire();
// do work
lock.release();
```

**Type**

```js
class AsyncLock {
release(): void {};
}
```

## jstools/errors
| Error | Description |
| ----- | ----------- |
| AsyncError | Async-related errors |
| RuntimeError | Runtime errors |
| AsyncRuntimeError | Async-related runtime errors |
| DeadlockError | Potential deadlocks |
| AsyncDeadlockError | Async-related potential deadlocks |
| RuntimeAsyncDeadlockError | Runtime async-related potential deadlocks |
| TypeConversionError | Error during type conversions |
| LogicError | Failed assertion or unexpected value |

## jstools/types

> `int.toString()`
>
> Arguments:
> * `n: number?`
>
> Returns: `string | "(undefined)" | "(math.inf)" | "-(math.inf)" | "NaN"`
>
> Description:
> > Safely convert a number to a string (correctly handles inf/nan values and undefined values)

> `int.toHex()`
>
> Arguments:
> * `n: number?`
> * `signed: boolean = false` (whether to not convert to an unsigned integer)
>
> Returns: `HexString | "0xinf" | "-0xinf" | "NaN"`
>
> Description:
> > Safely convert a number to a hex string (correctly handles inf/nan values and undefined values)

> `hex.toInt()`
>
> Arguments:
> * `h: HexString?`
>
> Returns: `number`
> Description:
> > Safely convert a hex string into a number

> `hex.toIntAsString()`
>
> Arguments:
> * `h: HexString?`
>
> Returns: `string | "(undefined)" | "(math.inf)" | "-(math.inf)" | "NaN"`
>
> Description:
> > Convert a hex string into an integer and then into a string

> `hex.asString()`
>
> Arguments:
> * `h: HexString?`
>
> Returns: `string | "(undefined)"`
>
> Description:
> > Converts the raw contents of a hex string into an ordinary string
