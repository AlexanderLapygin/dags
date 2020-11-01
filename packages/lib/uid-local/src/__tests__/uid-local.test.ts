import { UIDLocal } from '../uid-local'

describe('UID', () => {
  describe('constructor', () => {
    it('Should create UID successfully', () => {
      expect(() => new UIDLocal()).not.toThrow()
    })
    it('Should create different UIDs', () => {
      expect(new UIDLocal()).not.toEqual(new UIDLocal())
    })
  })
  describe('equals', () => {
    it('Should return false on different UIDs', () => {
      expect(new UIDLocal().equals(new UIDLocal())).toBe(false)
    })

    it('Should be true on the same UIDs', () => {
      const uid1 = new UIDLocal()
      const uid2 = uid1
      expect(uid1.equals(uid2)).toBe(true)
    })
  })
})
