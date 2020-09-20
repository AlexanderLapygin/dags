import { UID } from '../uid';

describe("UID", () => {
    describe("constructor", () => {
      it("Should create UID successfully", () => {
        expect(() => new UID()).not.toThrow();
      })
      it("Should create different UIDs", () => {
        expect(new UID()).not.toEqual(new UID());
      })
    })
    describe("equals", () => {
      it("Should return false on different UIDs", () => {
        expect(new UID().equals(new UID())).toBe(false);
      });

      it("Should be true on the same UIDs", () => {
        const uid1 = new UID();
        const uid2 = uid1
        expect(uid1.equals(uid2)).toBe(true);
      })
    })
})
