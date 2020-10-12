import { UIDMock } from './uid-mock';
import { Node } from '../node';

describe('Dag node', () => {
  describe("constructor", () => {
    it("Should execute without any problem", () => {
      expect(() => new Node(new UIDMock())).not.toThrow();
    })
  })
  describe("getId", () => {
    it("Should return its id", () => {
      const id = new UIDMock();
      expect(new Node(id).getId()).toBe(id);
    })
  })
  describe("getChildren", () => {
    it("Should return an empty child set just after construction", () => {
      expect(new Node(new UIDMock()).getChildren().size).toBe(0);
    })
    it("Should return an actual child set", () => {
      expect(new Node(new UIDMock()).getChildren().size).toBe(0);
      fail("Needs completion");
    })
    fail("Needs completion");
  })
  describe("addChild", () => {
    it("Should increase child set size", () => {
      const node = new Node(new UIDMock());
      expect(node.getChildren().size).toBe(0);
      node.addChild(new Node(new UIDMock()));
      expect(node.getChildren().size).toBe(1);
      node.addChild(new Node(new UIDMock()));
      expect(node.getChildren().size).toBe(2);
    })
    fail("Needs completion");
  })
});
