import { UIDCounter } from '@dags/core'

console.log('UIDCounter example')

const uid1 = new UIDCounter()
const uid2 = new UIDCounter()

console.log(uid1)
console.log(uid2)
console.log(uid1.equals(uid2))
