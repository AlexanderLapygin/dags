








# UID that is implemented in TypeScript as UUID.

This library is based on [uuid](https://github.com/uuidjs/uuid) implementation to support global
uniqueness.

## Usage

```ts
import { UUID } from '@dags/core'

const uuid1 = new UUID()
const uuid2 = new UUID()

console.log(uuid1)
console.log(uuid2)
console.log(uuid1.equals(uuid2))
```
