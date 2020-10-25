import { UIDCounter } from '../uid-counter'

describe('UID', () => {
  describe('constructor', () => {
    it('Should create UID successfully', () => {
      expect(() => new UIDCounter()).not.toThrow()
    })
    it('Should create different UIDs', () => {
      expect(new UIDCounter()).not.toEqual(new UIDCounter())
    })
  })
  describe('equals', () => {
    it('Should return false on different UIDs', () => {
      expect(new UIDCounter().equals(new UIDCounter())).toBe(false)
    })

    it('Should be true on the same UIDs', () => {
      const uid1 = new UIDCounter()
      const uid2 = uid1
      expect(uid1.equals(uid2)).toBe(true)
    })
  })
})
