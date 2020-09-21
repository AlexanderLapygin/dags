/**
 * Required interface
 */
export interface UID {
  newUID(): any;
  equals(uid: UID): boolean;
}

/**
 * Provides DAG - Directed Acyclic Graph functionality.
 */
export class Dag<T extends UID> {

  /**
   * Set of nodes of the graph
   * @type {Set}
   * @private
   */
  private _nodes = new Set<T>();

  /**
   * Map of nodes to their children.
   * @type {Map}
   * @private
   */
  private _childMap = new Map<T, Set<T>>();

  /**
   * Map of nodes to their parents.
   * @type {Map}
   * @private
   */
  private _parentMap = new Map<T, Set<T>>();

  /**
   * Creates a DAG.
   * @class a Directed Acyclic Graph.
   * @constructor
   * @param dagUID uid of this dag
   */
  constructor(private dagUID: T) {}

  /**
   * Generate a new uid
   * @return some new uid.
   */
  newUID(): T {
    return this.dagUID.newUID();
  }

  /**
   * Create new node of this graph
   * @return {UID} uid of the new node
   */
  newNode(): T {
    const nodeUID: T = this.newUID();
    this._nodes.add(nodeUID);
    this._parentMap.set(nodeUID, new Set<T>());
    this._childMap.set(nodeUID, new Set<T>());
    return nodeUID;
  }

  /**
   * Delete a node from nodeset of this graph.
   * @return {Dag} this graph.
   * @param node
   */
  deleteNode(node: T): Dag<T> {
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
  getNodes(): Set<T> {
    return this._nodes;
  }

  getParents(node: T): Set<T> {
    if(!this._nodes.has(node)) throw new Error("node doesn't belong to this graph");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._parentMap.get(node)!;
  }

  getChildren(node: T): Set<T> {
    if(!this._nodes.has(node)) throw new Error("node doesn't belong to this graph");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._childMap.get(node)!;
  }

  /**
   * Add parent node to the given node and implicitly add given node to the parent node as a child.
   * @return {Dag} this dag
   */
  setParenthood(child: T, parent: T): Dag<T> {
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
   * @return {Dag<T>>} this dag
   */
  removeParenthood(child: T, parent: T): Dag<T> {
    if(!this._nodes.has(child)) throw new Error("Child node doesn't belong to this graph");
    if(!this._nodes.has(parent)) throw new Error("Parent node doesn't belong to this graph");

    this.getParents(child).delete(parent);
    this.getChildren(parent).delete(child);

    return this;
  }

  private checkCycle(child: T, parent: T) {
    if(this.isDescendant(child, parent)) {
      throw new Error("The Parent-child relationship is not possible: this parenthood establishing leads to a cycle");
    }
  }

  /**
   * Checking if the node being checked is a descendant or not.
   * @param current current node.
   * @param tested tested node.
   */
  isDescendant(current: T, tested: T) {
    if (current.equals(tested)) {
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
