import { UUID } from '../uid-uuid';

describe('UID', () => {
  describe('constructor', () => {
    it('Should create UID successfully', () => {
      expect(() => new UUID()).not.toThrow();
    });
    it('Should create different UIDs', () => {
      expect(new UUID()).not.toEqual(new UUID());
    });
  });
  describe('equals', () => {
    it('Should return false on different UIDs', () => {
      expect(new UUID().equals(new UUID())).toBe(false);
    });

    it('Should be true on the same UIDs', () => {
      const uid1 = new UUID();
      const uid2 = uid1;
      expect(uid1.equals(uid2)).toBe(true);
    });
  });
  describe('newUID', () => {
    const uuid = new UUID();
    it('Should return unique ids', () => {
      expect(uuid.newUID() == uuid.newUID()).toBe(false);
    });
    it('Should return a value of type \'object\'', () => {
      expect(typeof uuid.newUID()).toBe('object');
    });
  });
});
