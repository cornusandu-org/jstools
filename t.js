import { AsyncLock } from "jstools/async";

const lock = await AsyncLock.new("myLock", false);

await lock.acquire();
await lock.acquire();
lock.release();
lock.release();
