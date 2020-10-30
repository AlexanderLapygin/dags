import { UIDLocal } from '@dags/core'

console.log('UIDLocal example')

const uid1 = new UIDLocal()
const uid2 = new UIDLocal()

console.log(uid1)
console.log(uid2)
console.log(uid1.equals(uid2))
