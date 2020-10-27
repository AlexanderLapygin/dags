import { UIDCounter } from '@dags/core'

const uuid1 = new UIDCounter()
const uuid2 = new UIDCounter()

console.log(uuid1)
console.log(uuid1.equals(uuid2))
