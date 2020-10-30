# UID that is implemented in TypeScript as a counter.

It is specialized for the cases that do not require global uniqueness, but require memory savings
and speed.

## Usage

```ts
import { UIDCounter } from '@dags/core'

const uid1 = new UIDCounter()
const uid2 = new UIDCounter()

console.log(uid1)
console.log(uid2)
console.log(uid1.equals(uid2))
```
