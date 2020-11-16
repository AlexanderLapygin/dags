// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DagGateway, UID } from '@dags/dag-base'
import { DagGatewayInMemory } from '../dag-gateway-in-memory'
import { UIDLocal } from '@dags/uid-local'

describe('DagGatewayInMemory', () => {
  let dagGateway: DagGateway

  beforeEach(function () {
    dagGateway = new DagGatewayInMemory()
  })

  describe('constructor', () => {
    it('Should execute without any problem', () => {
      expect(() => new DagGatewayInMemory()).not.toThrow()
    })
    it('Should return an empty nodeset', () => {
      expect(dagGateway.getNodes().size).toBe(0)
    })
  })

  describe('getNodes', () => {
    it('Should return an actual dag nodeset', () => {
      expect(dagGateway.getNodes().size).toBe(0)
      const nodeUID = new UIDLocal()
      dagGateway.addNode(nodeUID)
      expect(dagGateway.getNodes()).toContain(nodeUID)
      dagGateway.deleteNode(nodeUID)
      expect(dagGateway.getNodes()).not.toContain(nodeUID)
    })
  })

  describe('addNode', () => {
    it('Should increase a nodeset size', () => {
      dagGateway.addNode(new UIDLocal())
      expect(dagGateway.getNodes().size).toBe(1)
      dagGateway.addNode(new UIDLocal())
      expect(dagGateway.getNodes().size).toBe(2)
    })
    it('Should add nodeUID to the nodeset', () => {
      const nodeUID1 = new UIDLocal()
      dagGateway.addNode(nodeUID1)
      expect(dagGateway.getNodes()).toContain(nodeUID1)
      const nodeUID2 = new UIDLocal()
      dagGateway.addNode(nodeUID2)
      expect(dagGateway.getNodes()).toContain(nodeUID2)
    })
  })

  describe('deleteNode', () => {
    let node1: UID
    let node2: UID
    beforeEach(function () {
      node1 = new UIDLocal()
      node2 = new UIDLocal()
      dagGateway.addNode(node1).addNode(node2)
    })

    it('Should return this dag', () => {
      expect(dagGateway.deleteNode(node1)).toBe(dagGateway)
    })
    it('Should decrease a nodeset size', () => {
      expect(dagGateway.getNodes().size).toBe(2)
      expect(dagGateway.deleteNode(node1).getNodes().size).toBe(1)
      expect(dagGateway.deleteNode(node2).getNodes().size).toBe(0)
    })
    it('Should remove nodeUID from the nodeset', () => {
      expect(dagGateway.deleteNode(node1).getNodes()).not.toContain(node1)
      expect(dagGateway.deleteNode(node2).getNodes()).not.toContain(node1)
    })
    it('Should remove a parent-child relationships of the given node', () => {
      const node = new UIDLocal()
      const parent1 = new UIDLocal()
      const parent2 = new UIDLocal()
      const child1 = new UIDLocal()
      const child2 = new UIDLocal()
      dagGateway.addNode(node).addNode(parent1).addNode(parent2).addNode(child1).addNode(child2)

      dagGateway.setParenthood(node, parent1)
      dagGateway.setParenthood(node, parent2)
      dagGateway.setParenthood(child1, node)
      dagGateway.setParenthood(child2, node)

      dagGateway.deleteNode(node)

      expect(dagGateway.getChildren(parent1)).not.toContain(node)
      expect(dagGateway.getChildren(parent2)).not.toContain(node)
      expect(dagGateway.getParents(child1)).not.toContain(node)
      expect(dagGateway.getParents(child2)).not.toContain(node)
    })
  })
  describe('getParents', () => {
    it('Should return an empty parent set of the given node', () => {
      const node = new UIDLocal()
      dagGateway.addNode(node)
      expect(dagGateway.getParents(node).size).toBe(0)
    })
    it('Should return an actual parent set of the given node', () => {
      const current = new UIDLocal()
      const parent = new UIDLocal()
      dagGateway.addNode(current).addNode(parent)

      expect(dagGateway.getParents(current)).not.toContain(parent)
      dagGateway.setParenthood(parent, current)
      expect(dagGateway.getParents(current)).toContain(parent)
      dagGateway.removeParenthood(parent, current)
      expect(dagGateway.getParents(current)).not.toContain(parent)
    })
    it('Should throw an error in case of orphan given node', () => {
      expect(() => {
        return dagGateway.getParents(new UIDLocal())
      }).toThrowError("node doesn't belong to this graph")
    })
  })

  describe('setParenthood', () => {
    let child: UID
    let parent: UID
    beforeEach(function () {
      child = new UIDLocal()
      parent = new UIDLocal()
      dagGateway.addNode(parent).addNode(child)
    })

    it('Should throw an error in case of both orphan UIDs', () => {
      expect(() => dagGateway.setParenthood(new UIDLocal(), new UIDLocal())).toThrowError()
    })
    it('Should throw an Error in case of orphan currentNode', () => {
      expect(() => dagGateway.setParenthood(parent, new UIDLocal())).toThrowError(
        "Child node doesn't belong to this graph"
      )
    })
    it('Should throw an Error in case of orphan parent', () => {
      expect(() => dagGateway.setParenthood(new UIDLocal(), child)).toThrowError(
        "Parent node doesn't belong to this graph"
      )
    })
    it('Should return this dag', () => {
      expect(dagGateway.setParenthood(parent, child)).toBe(dagGateway)
    })
    it('Should add the given parent to the given parent set', () => {
      expect(dagGateway.getParents(child)).not.toContain(parent)
      dagGateway.setParenthood(parent, child)
      expect(dagGateway.getParents(child)).toContain(parent)
    })
    it("Should add the given node to the parent's child set", () => {
      expect(dagGateway.getChildren(parent)).not.toContain(child)
      dagGateway.setParenthood(parent, child)
      expect(dagGateway.getChildren(parent)).toContain(child)
    })
    it('Should throw an Error when a parenthood established with itself', () => {
      expect(() => dagGateway.setParenthood(child, child)).toThrowError(
        'The Parent-child relationship is not possible: this parenthood establishing leads to a cycle'
      )
    })
    it('Should throw an error when parenthood establishing leads to a cycle', () => {
      dagGateway.setParenthood(parent, child)
      expect(() => dagGateway.setParenthood(child, parent)).toThrowError(
        'The Parent-child relationship is not possible: this parenthood establishing leads to a cycle'
      )
      const grandson = new UIDLocal()
      dagGateway.addNode(grandson)
      dagGateway.setParenthood(child, grandson)
      expect(() => dagGateway.setParenthood(grandson, parent)).toThrowError(
        'The Parent-child relationship is not possible: this parenthood establishing leads to a cycle'
      )
    })
  })

  describe('removeParenthood', () => {
    let child: UID
    let parent: UID
    let anotherParent: UID
    beforeEach(function () {
      child = new UIDLocal()
      parent = new UIDLocal()
      anotherParent = new UIDLocal()
      dagGateway.addNode(child).addNode(parent).addNode(anotherParent)
      dagGateway.setParenthood(parent, child).setParenthood(anotherParent, child)
    })

    it('Should throw an error in case of both orphan UIDs', () => {
      expect(() => dagGateway.removeParenthood(new UIDLocal(), new UIDLocal())).toThrowError()
    })
    it('Should throw an Error in case of orphan currentNode', () => {
      expect(() => dagGateway.removeParenthood(parent, new UIDLocal())).toThrowError(
        "Child node doesn't belong to this graph"
      )
    })
    it('Should throw an Error in case of orphan parent', () => {
      expect(() => dagGateway.removeParenthood(new UIDLocal(), child)).toThrowError(
        "Parent node doesn't belong to this graph"
      )
    })
    it('Should return this dag', () => {
      expect(dagGateway.removeParenthood(parent, child)).toBe(dagGateway)
    })
    it('Should remove the given parent from the given parent set', () => {
      expect(dagGateway.getParents(child)).toContain(parent)
      dagGateway.removeParenthood(parent, child)
      expect(dagGateway.getParents(child)).not.toContain(parent)
    })
    it("Should remove the given child from the parent's child set", () => {
      expect(dagGateway.getChildren(parent)).toContain(child)
      dagGateway.removeParenthood(parent, child)
      expect(dagGateway.getChildren(parent)).not.toContain(child)
    })
  })

  describe('getChildren', () => {
    it('Should return empty child set of the given node', () => {
      const node = new UIDLocal()
      dagGateway.addNode(node)
      expect(dagGateway.getChildren(node).size).toBe(0)
    })
    it('Should return an actual child set of the given node', () => {
      const current = new UIDLocal()
      const child = new UIDLocal()
      dagGateway.addNode(current).addNode(child)
      expect(dagGateway.getChildren(current)).not.toContain(child)
      dagGateway.setParenthood(current, child)
      expect(dagGateway.getChildren(current)).toContain(child)
      dagGateway.removeParenthood(current, child)
      expect(dagGateway.getChildren(current)).not.toContain(child)
    })
    it('Should throw an error in case of orphan given node', () => {
      expect(() => dagGateway.getChildren(new UIDLocal())).toThrowError(
        "node doesn't belong to this graph"
      )
    })
  })

  describe('isDescendant', () => {
    let node: UID
    let son: UID
    let grandson: UID

    beforeEach(function () {
      node = new UIDLocal()
      son = new UIDLocal()
      grandson = new UIDLocal()
      dagGateway
        .addNode(node)
        .addNode(son)
        .addNode(grandson)
        .setParenthood(node, son)
        .setParenthood(son, grandson)
    })

    it('Should return false on arbitrary new node pair', () => {
      const node = new UIDLocal()
      dagGateway.addNode(node)
      expect(dagGateway.isDescendant(node, new UIDLocal())).toBe(false)
    })
    it('Should return true when parenthood establishing leads to a cycle', () => {
      expect(dagGateway.isDescendant(node, node)).toBe(true)
    })
    it('Should return true for node and child', () => {
      expect(dagGateway.isDescendant(node, son)).toBe(true)
    })
    it('Should return false for child and node', () => {
      expect(dagGateway.isDescendant(son, node)).toBe(false)
    })
    it('Should return true for node and grandson', () => {
      expect(dagGateway.isDescendant(node, son)).toBe(true)
    })
    it('Should return false for grandson and node ', () => {
      expect(dagGateway.isDescendant(son, node)).toBe(false)
    })
  })
})
