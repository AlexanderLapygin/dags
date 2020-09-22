import { UIDCounter } from '../uid-counter';

describe('UID', () => {
  describe('constructor', () => {
    it('Should create UID successfully', () => {
      expect(() => new UIDCounter()).not.toThrow();
    });
    it('Should create different UIDs', () => {
      expect(new UIDCounter()).not.toEqual(new UIDCounter());
    });
  });
  describe('equals', () => {
    it('Should return false on different UIDs', () => {
      expect(new UIDCounter().equals(new UIDCounter())).toBe(false);
    });

    it('Should be true on the same UIDs', () => {
      const uid1 = new UIDCounter();
      const uid2 = uid1;
      expect(uid1.equals(uid2)).toBe(true);
    });
  });
  describe('newUID', () => {
    const uid = new UIDCounter();
    it('Should return unique ids', () => {
      expect(uid.newUID() == uid.newUID()).toBe(false);
    });
    it('Should return a value of type \'object\'', () => {
      expect(typeof uid.newUID()).toBe('object');
    });
  });
});
