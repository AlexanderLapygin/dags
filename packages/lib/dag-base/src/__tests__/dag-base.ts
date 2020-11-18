import { mock } from 'jest-mock-extended'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UID, DagBase, DagOut } from '../dag-base'

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

describe('DagBase', () => {
  let dag: DagBase
  let mockDagOut: DagOut

  beforeEach(function () {
    mockDagOut = mock<DagOut>()
    dag = new DagBase(mockDagOut, UIDMock)
  })

  describe('constructor', () => {
    it('Should execute without any problem', () => {
      expect(() => new DagBase(mockDagOut, UIDMock)).not.toThrow()
    })
    it('Should create a unique own id', () => {
      const dag1 = new DagBase(mockDagOut, UIDMock)
      const dag2 = new DagBase(mockDagOut, UIDMock)
      expect(dag1.id).not.toBe(dag2.id)
    })
  })

  describe('getNodes', () => {
    it('Should call DagOut.getNodes()', () => {
      dag.getNodes()
      expect(mockDagOut.getNodes).toHaveBeenCalled()
    })
  })

  describe('newNode', () => {
    it('Should return a unique node id', () => {
      expect(dag.newNode()).not.toBe(dag.newNode())
    })
    it('Should call DagOut.addNode() with generated node uid', () => {
      const node = dag.newNode()
      expect(mockDagOut.addNode).toHaveBeenCalledWith(node)
    })
  })

  describe('deleteNode', () => {
    let node: UID
    beforeEach(function () {
      node = dag.newNode()
    })

    it('Should return this dag', () => {
      expect(dag.deleteNode(node)).toBe(dag)
    })
    it('Should call DagOut.deleteNode() with the same node id', () => {
      dag.deleteNode(node)
      expect(mockDagOut.deleteNode).toHaveBeenCalledWith(node)
    })
  })

  describe('getParents', () => {
    it('Should call DagOut.getParents() with the same node uid', () => {
      const node = dag.newNode()
      dag.getParents(node)
      expect(mockDagOut.getParents).toHaveBeenCalledWith(node)
    })
  })

  describe('setParenthood', () => {
    let child: UID
    let parent: UID
    beforeEach(function () {
      child = dag.newNode()
      parent = dag.newNode()
    })

    it('Should return this dag', () => {
      expect(dag.setParenthood(parent, child)).toBe(dag)
    })
    it('Should call DagOut.setParenthood() with the same parent and child ids', () => {
      dag.setParenthood(parent, child)
      expect(mockDagOut.setParenthood).toHaveBeenCalledWith(parent, child)
    })
  })

  describe('removeParenthood', () => {
    let child: UID
    let parent: UID
    beforeEach(function () {
      child = dag.newNode()
      parent = dag.newNode()
      dag.setParenthood(parent, child)
    })

    it('Should return this dag', () => {
      expect(dag.removeParenthood(parent, child)).toBe(dag)
    })
    it('Should call DagOut.removeParenthood() with the same parent and child ids', () => {
      dag.removeParenthood(parent, child)
      expect(mockDagOut.removeParenthood).toHaveBeenCalledWith(parent, child)
    })
  })

  describe('getChildren', () => {
    it('Should call DagOut.getChildren() with the same node uid', () => {
      const node = dag.newNode()
      dag.getChildren(node)
      expect(mockDagOut.getChildren).toHaveBeenCalledWith(node)
    })
  })

  describe('isDescendant', () => {
    it('Should call DagOut.removeParenthood() with the same child and parent ids', () => {
      const child = dag.newNode()
      const parent = dag.newNode()
      dag.isDescendant(child, parent)
      expect(mockDagOut.isDescendant).toHaveBeenCalledWith(child, parent)
    })
  })
})
