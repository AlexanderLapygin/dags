# UID that is implemented in TypeScript as counter.

It is specialized for the cases that do not require global uniqueness, but require memory savings
and speed.

## Usage

```ts
import { UIDCounter } from '@dags/core'

const uuid1 = new UIDCounter()
const uuid2 = new UIDCounter()

console.log(uuid1)
console.log(uuid2)
console.log(uuid1.equals(uuid2))
```
