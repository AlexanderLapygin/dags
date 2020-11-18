/**
 * Provides DAG gateway-in-memory implementation.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DagOut, UID } from '@dags/dag-base'

export class DagGatewayInMemory implements DagOut {
  /**
   * Set of nodes of the dag
   * @type {Set}
   * @private
   */
  private _nodes = new Set<UID>()

  /**
   * Map of nodes to their children.
   * @type {Map}
   * @private
   */
  private _childMap = new Map<UID, Set<UID>>()

  /**
   * Map of nodes to their parents.
   * @type {Map}
   * @private
   */
  private _parentMap = new Map<UID, Set<UID>>()

  addNode(node: UID): DagOut {
    this._nodes.add(node)
    this._parentMap.set(node, new Set<UID>())
    this._childMap.set(node, new Set<UID>())
    return this
  }

  /**
   * Delete a node from nodeset of this graph.
   * @return {DagOut} this graph.
   * @param node
   */
  deleteNode(node: UID): DagOut {
    for (const parent of this.getParents(node)) {
      this.removeParenthood(node, parent)
    }
    for (const child of this.getChildren(node)) {
      this.removeParenthood(child, node)
    }

    this._nodes.delete(node)
    return this
  }

  /**
   * @return nodeset of this dag
   */
  getNodes(): Set<UID> {
    return this._nodes
  }

  /**
   * Obtain parents of the given node.
   * @param node
   * @return parents of the given node.
   */
  getParents(node: UID): Set<UID> {
    if (!this._nodes.has(node)) throw new Error("node doesn't belong to this graph")

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._parentMap.get(node)!
  }

  /**
   * Obtain children of the given node.
   * @param node
   * @return children of the given node.
   */
  getChildren(node: UID): Set<UID> {
    if (!this._nodes.has(node)) throw new Error("node doesn't belong to this graph")

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._childMap.get(node)!
  }

  /**
   * Add parent node to the given node and implicitly add given node to the parent node as a child.
   * @return {DagOut} this dag
   */
  setParenthood(parent: UID, child: UID): DagOut {
    if (!this._nodes.has(child)) throw new Error("Child node doesn't belong to this graph")
    if (!this._nodes.has(parent)) throw new Error("Parent node doesn't belong to this graph")

    this.checkCycle(parent, child)

    this.getParents(child).add(parent)
    this.getChildren(parent).add(child)

    return this
  }

  /**
   * Remove parent node from the given node and implicitly remove the given node.
   * from the parent node as a child.
   * @return {DagOut} this dag
   */
  removeParenthood(parent: UID, child: UID): DagOut {
    if (!this._nodes.has(child)) throw new Error("Child node doesn't belong to this graph")
    if (!this._nodes.has(parent)) throw new Error("Parent node doesn't belong to this graph")

    this.getParents(child).delete(parent)
    this.getChildren(parent).delete(child)

    return this
  }

  /**
   * Checking if the node being checked is a descendant or not.
   * @param current current node.
   * @param tested tested node.
   */
  isDescendant(current: UID, tested: UID) {
    if (current.equals(tested)) return true

    for (const child of this.getChildren(current))
      if (this.isDescendant(child, tested)) {
        return true
      }

    return false
  }

  private checkCycle(parent: UID, child: UID) {
    if (this.isDescendant(child, parent))
      throw new Error(
        'The Parent-child relationship is not possible: this parenthood establishing leads to a cycle'
      )
  }
}
