# jstools
## jstools/async
### AsyncLock
A mutex designed to allow safe concurrent access of shared values.

**Example**

```js
const lock = await AsyncLock.new("myLock");

await lock.acquire();
doWork();
lock.release();

const v = await lock.with(async () => {
    await doWork();
});
if (v instanceof Error) throw v;  // Check for thrown errors
```

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

#### AsyncLock.with
**Description**

Acquire the lock, run a block of code, release the lock and return the value returned by the block of code (if any), or an error (if any error was thrown).

**Type**

```js
class AsyncLock {
with(fn: () => Promise<Empty>): Promise<Empty | Error | any> {};
}
```


### getAsyncContextId
Get a unique identifier for the current async context.

Takes no arguments, returns a number.


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

These errors are not specific to this library, so feel free to use them yourself!

## jstools/types
`int.toString()`

Arguments:
* `n: number?`

Returns: `string | "(undefined)" | "(math.inf)" | "-(math.inf)" | "NaN"`

Description: Safely convert a number to a string (correctly handles inf/nan values and undefined values)
<br><br><br>

`int.toHex()`

Arguments:
* `n: number?`
* `signed: boolean = false` (whether to not convert to an unsigned integer)

Returns: `HexString | "0xinf" | "-0xinf" | "NaN"`

Description: Safely convert a number to a hex string (correctly handles inf/nan values and undefined values)
<br><br><br>

`int.toOctal()`

Arguments:
* `n: number?`
* `signed: boolean = false` (whether to not convert to an unsigned integer)

Returns: `OctalString | "0oinf" | "-0oinf" | "NaN"`

Description: Safely convert a number to an octal string (correctly handles inf/nan values and undefined values)
<br><br><br>

`hex.toInt()`

Arguments:
* `h: HexString?`

Returns: `number`
Description: Safely convert a hex string into a number
<br><br><br>

`hex.toIntAsString()`

Arguments:
* `h: HexString?`

Returns: `string | "(undefined)" | "(math.inf)" | "-(math.inf)" | "NaN"`

Description: Convert a hex string into an integer and then into a string
<br><br><br>

`hex.asString()`

Arguments:
* `h: HexString?`

Returns: `string | "(undefined)"`

Description: Converts the raw contents of a hex string into an ordinary string
<br><br><br>

`octal.toInt()`

Arguments:
* `h: HexString?`

Returns: `number`
Description: Safely convert an octal string into a number
<br><br><br>

`octal.toIntAsString()`

Arguments:
* `h: HexString?`

Returns: `string | "(undefined)" | "(math.inf)" | "-(math.inf)" | "NaN"`

Description: Convert an octal string into an integer and then into a string
<br><br><br>

`octal.asString()`

Arguments:
* `h: HexString?`

Returns: `string | "(undefined)"`

Description: Converts the raw contents of an octal string into an ordinary string
