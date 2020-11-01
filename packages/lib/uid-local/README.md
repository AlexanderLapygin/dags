# UID for local use - implemented as a counter.

It is specialized for the cases that do not require global uniqueness, but require memory savings
and speed.

## Usage

```ts
import { UIDLocal } from '@dags/core'

const uid1 = new UIDLocal()
const uid2 = new UIDLocal()

console.log(uid1)
console.log(uid2)
console.log(uid1.equals(uid2))
```
