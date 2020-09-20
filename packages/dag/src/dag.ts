/**
 * Interface to provide DAG functionality.
 *
 * @param {UID} - id type
 */
import { UID } from '@dags/uid';

export class Dag {

  /**
   * Set of nodes of the graph
   * @type {Set<UID>>}
   * @private
   */
  private _nodes = new Set<UID>();

  /**
   * Map of nodes to their children.
   * @type {Map<UID, UID>}
   * @private
   */
  private _childMap = new Map<UID, Set<UID>>();

  /**
   * Map of nodes to their parents.
   * @type {Map<UID, UID>}
   * @private
   */
  private _parentMap = new Map<UID, Set<UID>>();

  /**
   * Creates a DAG - Directed Acyclic Graph.
   * @class a Directed Acyclic Graph.
   * @constructor
   */
  constructor() {}

  /**
   * Create new node of this graph
   * @return {UID} uid of the new node
   */
  newNode(): UID {
    const nodeUID = new UID();
    this._nodes.add(nodeUID);
    this._parentMap.set(nodeUID, new Set<UID>());
    this._childMap.set(nodeUID, new Set<UID>());
    return nodeUID;
  }

  /**
   * Delete a node from nodeset of this graph.
   * @param {UID} UID of the node to delete.
   * @return {Dag} this graph.
   */
  deleteNode(node: UID): Dag {
    for (const parent of this.getParents(node)) {
      this.removeParenthood(node, parent);
    }
    for (const child of this.getChildren(node)) {
      this.removeParenthood(child, node);
    }

    this._nodes.delete(node);
    return this;
  }

  /**
   * @return all dag roots
   */
  getNodes(): Set<UID> {
    return this._nodes;
  }

  getParents(node: UID): Set<UID> {
    if(!this._nodes.has(node)) throw new Error("node doesn't belong to this graph");
    return this._parentMap.get(node)!;
  }

  getChildren(node: UID): Set<UID> {
    if(!this._nodes.has(node)) throw new Error("node doesn't belong to this graph");
    return this._childMap.get(node)!;
  }

  /**
   * Add parent node to the given node and implicitly add given node to the parent node as a child.
   * @return {Dag} this dag
   */
  setParenthood(child: UID, parent: UID): Dag {
    if(!this._nodes.has(child)) throw new Error("Child node doesn't belong to this graph");
    if(!this._nodes.has(parent)) throw new Error("Parent node doesn't belong to this graph");

    this.checkCycle(child, parent)

    this.getParents(child).add(parent);
    this.getChildren(parent).add(child);

    return this;
  }

  /**
   * Remove parent node from the given node and implicitly remove the given node
   * from the parent node as a child.
   * @return {Dag} this dag
   */
  removeParenthood(child: UID, parent: UID): Dag {
    if(!this._nodes.has(child)) throw new Error("Child node doesn't belong to this graph");
    if(!this._nodes.has(parent)) throw new Error("Parent node doesn't belong to this graph");

    this.checkCycle(child, parent)

    this.getParents(child).delete(parent);
    this.getChildren(parent).delete(child);

    return this;
  }

  private checkCycle(child: UID, parent: UID) {
    if(this.isDescendant(child, parent)) {
      throw new Error("The Parent-child relationship is not possible: this parenthood establishing leads to a cycle");
    }
  }

  isDescendant(current: UID, tested: UID) {
    if (current === tested) {
      return true;
    }
    for(const child of this.getChildren(current)) {
      if(this.isDescendant(child, tested)) {
        return true;
      }
    }
    return false;
  }
}
