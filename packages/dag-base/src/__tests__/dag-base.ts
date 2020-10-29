// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UID, DagBase } from '../dag-base'

export class UIDMock implements UID {
  private static _counter = 0
  private readonly _id: number

  constructor() {
    this._id = UIDMock._counter++
  }

  newUID(): UID {
    return new UIDMock()
  }

  equals(uid: UID): boolean {
    return uid instanceof UIDMock && this._id === uid._id
  }
}

describe('Dag with UIDMock', () => {
  let dag: DagBase

  beforeEach(function () {
    dag = new DagBase(UIDMock)
  })

  describe('constructor', () => {
    it('Should execute without any problem', () => {
      expect(() => new DagBase(UIDMock)).not.toThrow()
    })
    it('Should return an empty nodeset', () => {
      expect(dag.getNodes().size).toBe(0)
    })
  })

  describe('getNodes', () => {
    it('Should return an actual dag nodeset', () => {
      expect(dag.getNodes().size).toBe(0)
      const nodeUID = dag.newNode()
      expect(dag.getNodes()).toContain(nodeUID)
      dag.deleteNode(nodeUID)
      expect(dag.getNodes()).not.toContain(nodeUID)
    })
  })

  describe('newNode', () => {
    it('Should increase a nodeset size', () => {
      dag.newNode()
      expect(dag.getNodes().size).toBe(1)
      dag.newNode()
      expect(dag.getNodes().size).toBe(2)
    })
    it('Should insert nodeUID in the nodeset', () => {
      const nodeUID1 = dag.newNode()
      expect(dag.getNodes()).toContain(nodeUID1)
      const nodeUID2 = dag.newNode()
      expect(dag.getNodes()).toContain(nodeUID2)
    })
  })

  describe('deleteNode', () => {
    let node1: UID
    let node2: UID
    beforeEach(function () {
      node1 = dag.newNode()
      node2 = dag.newNode()
    })

    it('Should return this dag', () => {
      expect(dag.deleteNode(node1)).toBe(dag)
    })
    it('Should decrease a nodeset size', () => {
      expect(dag.getNodes().size).toBe(2)
      expect(dag.deleteNode(node1).getNodes().size).toBe(1)
      expect(dag.deleteNode(node2).getNodes().size).toBe(0)
    })
    it('Should remove nodeUID from the nodeset', () => {
      expect(dag.deleteNode(node1).getNodes()).not.toContain(node1)
      expect(dag.deleteNode(node2).getNodes()).not.toContain(node1)
    })
    it('Should remove a parent-child relationships of the given node', () => {
      const node = dag.newNode()
      const parent1 = dag.newNode()
      const parent2 = dag.newNode()
      const child1 = dag.newNode()
      const child2 = dag.newNode()
      dag.setParenthood(node, parent1)
      dag.setParenthood(node, parent2)
      dag.setParenthood(child1, node)
      dag.setParenthood(child2, node)

      dag.deleteNode(node)

      expect(dag.getChildren(parent1)).not.toContain(node)
      expect(dag.getChildren(parent2)).not.toContain(node)
      expect(dag.getParents(child1)).not.toContain(node)
      expect(dag.getParents(child2)).not.toContain(node)
    })
  })
  describe('getParents', () => {
    it('Should return an empty parent set of the given node', () => {
      const node = dag.newNode()
      expect(dag.getParents(node).size).toBe(0)
    })
    it('Should return an actual parent set of the given node', () => {
      const current = dag.newNode()
      const parent = dag.newNode()
      expect(dag.getParents(current)).not.toContain(parent)
      dag.setParenthood(current, parent)
      expect(dag.getParents(current)).toContain(parent)
      dag.removeParenthood(current, parent)
      expect(dag.getParents(current)).not.toContain(parent)
    })
    it('Should throw an error in case of orphan given node', () => {
      expect(() => {
        return dag.getParents(new dag.uid())
      }).toThrowError("node doesn't belong to this graph")
    })
  })

  describe('setParenthood', () => {
    let child: UID
    let parent: UID
    beforeEach(function () {
      child = dag.newNode()
      parent = dag.newNode()
    })

    it('Should throw an error in case of both orphan UIDs', () => {
      expect(() => dag.setParenthood(new dag.uid(), new dag.uid())).toThrowError()
    })
    it('Should throw an Error in case of orphan currentNode', () => {
      expect(() => dag.setParenthood(new dag.uid(), parent)).toThrowError(
        "Child node doesn't belong to this graph"
      )
    })
    it('Should throw an Error in case of orphan parent', () => {
      expect(() => dag.setParenthood(child, new dag.uid())).toThrowError(
        "Parent node doesn't belong to this graph"
      )
    })
    it('Should return this dag', () => {
      expect(dag.setParenthood(child, parent)).toBe(dag)
    })
    it('Should add the given parent to the given parent set', () => {
      expect(dag.getParents(child)).not.toContain(parent)
      dag.setParenthood(child, parent)
      expect(dag.getParents(child)).toContain(parent)
    })
    it("Should add the given node to the parent's child set", () => {
      expect(dag.getChildren(parent)).not.toContain(child)
      dag.setParenthood(child, parent)
      expect(dag.getChildren(parent)).toContain(child)
    })
    it('Should throw an Error when a parenthood established with itself', () => {
      expect(() => dag.setParenthood(child, child)).toThrowError(
        'The Parent-child relationship is not possible: this parenthood establishing leads to a cycle'
      )
    })
    it('Should throw an error when parenthood establishing leads to a cycle', () => {
      dag.setParenthood(child, parent)
      expect(() => dag.setParenthood(parent, child)).toThrowError(
        'The Parent-child relationship is not possible: this parenthood establishing leads to a cycle'
      )
      const grandson = dag.newNode()
      dag.setParenthood(grandson, child)
      expect(() => dag.setParenthood(parent, grandson)).toThrowError(
        'The Parent-child relationship is not possible: this parenthood establishing leads to a cycle'
      )
    })
  })

  describe('removeParenthood', () => {
    let child: UID
    let parent: UID
    let anotherParent: UID
    beforeEach(function () {
      child = dag.newNode()
      parent = dag.newNode()
      anotherParent = dag.newNode()
      dag.setParenthood(child, parent)
      dag.setParenthood(child, anotherParent)
    })

    it('Should throw an error in case of both orphan UIDs', () => {
      expect(() => dag.removeParenthood(new dag.uid(), new dag.uid())).toThrowError()
    })
    it('Should throw an Error in case of orphan currentNode', () => {
      expect(() => dag.removeParenthood(new dag.uid(), parent)).toThrowError(
        "Child node doesn't belong to this graph"
      )
    })
    it('Should throw an Error in case of orphan parent', () => {
      expect(() => dag.removeParenthood(child, new dag.uid())).toThrowError(
        "Parent node doesn't belong to this graph"
      )
    })
    it('Should return this dag', () => {
      expect(dag.removeParenthood(child, parent)).toBe(dag)
    })
    it('Should remove the given parent from the given parent set', () => {
      expect(dag.getParents(child)).toContain(parent)
      dag.removeParenthood(child, parent)
      expect(dag.getParents(child)).not.toContain(parent)
    })
    it("Should remove the given child from the parent's child set", () => {
      expect(dag.getChildren(parent)).toContain(child)
      dag.removeParenthood(child, parent)
      expect(dag.getChildren(parent)).not.toContain(child)
    })
  })

  describe('getChildren', () => {
    it('Should return empty child set of the given node', () => {
      const node = dag.newNode()
      expect(dag.getChildren(node).size).toBe(0)
    })
    it('Should return an actual child set of the given node', () => {
      const current = dag.newNode()
      const child = dag.newNode()
      expect(dag.getChildren(current)).not.toContain(child)
      dag.setParenthood(child, current)
      expect(dag.getChildren(current)).toContain(child)
      dag.removeParenthood(child, current)
      expect(dag.getChildren(current)).not.toContain(child)
    })
    it('Should throw an error in case of orphan given node', () => {
      expect(() => dag.getChildren(new dag.uid())).toThrowError("node doesn't belong to this graph")
    })
  })

  describe('isDescendant', () => {
    let node: UID
    let son: UID
    let grandson: UID

    beforeEach(function () {
      node = dag.newNode()
      son = dag.newNode()
      grandson = dag.newNode()
      dag.setParenthood(son, node)
      dag.setParenthood(grandson, son)
    })

    it('Should return false on arbitrary new node pair', () => {
      expect(dag.isDescendant(dag.newNode(), dag.newNode())).toBe(false)
    })
    it('Should return true when parenthood establishing leads to a cycle', () => {
      expect(dag.isDescendant(node, node)).toBe(true)
    })
    it('Should return true for node and child', () => {
      expect(dag.isDescendant(node, son)).toBe(true)
    })
    it('Should return false for child and node', () => {
      expect(dag.isDescendant(son, node)).toBe(false)
    })
    it('Should return true for node and grandson', () => {
      expect(dag.isDescendant(node, son)).toBe(true)
    })
    it('Should return false for grandson and node ', () => {
      expect(dag.isDescendant(son, node)).toBe(false)
    })
  })
})
