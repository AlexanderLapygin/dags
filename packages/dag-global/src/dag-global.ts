/**
 * Provides DAG - Directed Acyclic Graph functionality.
 */
import { DagBase, UID } from '@dags/dag-base'
import { UUID } from '@dags/uid-uuid'

export class DagGlobal {
  /**
   * Dag implementation on which this implementation is based
   * @private
   */
  private _dagBase = new DagBase(UUID)

  /**
   * Create new node of this graph.
   * @return {UID} uid of the new node
   */
  newNode(): UID {
    return this._dagBase.newNode()
  }

  /**
   * Delete a node from nodeset of this graph.
   * @return {Dag} this graph.
   * @param node
   */
  deleteNode(node: UID): DagGlobal {
    this._dagBase.deleteNode(node)
    return this
  }

  /**
   * @return nodeset of this dag
   */
  getNodes(): Set<UID> {
    return this._dagBase.getNodes()
  }

  /**
   * Obtain parents of the given node.
   * @param node
   * @return parents of the given node.
   */
  getParents(node: UID): Set<UID> {
    return this._dagBase.getParents(node)
  }

  /**
   * Obtain children of the given node.
   * @param node
   * @return children of the given node.
   */
  getChildren(node: UID): Set<UID> {
    return this._dagBase.getChildren(node)
  }

  /**
   * Add parent node to the given node and implicitly add given node to the parent node as a child.
   * @return {Dag} this dag
   */
  setParenthood(parent: UID, child: UID): DagGlobal {
    this._dagBase.setParenthood(parent, child)
    return this
  }

  /**
   * Remove parent node from the given node and implicitly remove the given node.
   * from the parent node as a child.
   * @return {Dag} this dag
   */
  removeParenthood(parent: UID, child: UID): DagGlobal {
    this._dagBase.removeParenthood(parent, child)
    return this
  }

  /**
   * Checking if the node being checked is a descendant or not.
   * @param current current node.
   * @param tested tested node.
   */
  isDescendant(current: UID, tested: UID) {
    return this._dagBase.isDescendant(current, tested)
  }
}
