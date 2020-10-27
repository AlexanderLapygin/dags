import { UUID } from '@dags/core'

const uuid1 = new UUID()
const uuid2 = new UUID()

console.log(uuid1)
console.log(uuid1.equals(uuid2))
