/**
 * Required interface
 */
export interface UID {
  newUID(): UID;
  equals(uid: UID): boolean;
}

/**
 * Provides DAG - Directed Acyclic Graph functionality.
 */
export class Dag<I extends UID> {

  /**
   * Set of nodes of the graph
   * @type {Set}
   * @private
   */
  private _nodes = new Set<I>();

  /**
   * Map of nodes to their children.
   * @type {Map}
   * @private
   */
  private _childMap = new Map<I, Set<I>>();

  /**
   * Map of nodes to their parents.
   * @type {Map}
   * @private
   */
  private _parentMap = new Map<I, Set<I>>();

  /**
   * Creates a DAG.
   * @class a Directed Acyclic Graph.
   * @constructor
   * @param dagUID uid of this dag
   */
  constructor(private dagUID: I) {}

  /**
   * Generate a new uid
   * @return {any} some new uid.
   */
  newUID(): any {
    return this.dagUID.newUID();
  }

  /**
   * Create new node of this graph
   * @return {UID} uid of the new node
   */
  newNode(): I {
    const nodeUID: I = this.newUID();
    this._nodes.add(nodeUID);
    this._parentMap.set(nodeUID, new Set<I>());
    this._childMap.set(nodeUID, new Set<I>());
    return nodeUID;
  }

  /**
   * Delete a node from nodeset of this graph.
   * @return {Dag} this graph.
   * @param node
   */
  deleteNode(node: I): Dag<I> {
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
  getNodes(): Set<I> {
    return this._nodes;
  }

  getParents(node: I): Set<I> {
    if(!this._nodes.has(node)) throw new Error("node doesn't belong to this graph");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._parentMap.get(node)!;
  }

  getChildren(node: I): Set<I> {
    if(!this._nodes.has(node)) throw new Error("node doesn't belong to this graph");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._childMap.get(node)!;
  }

  /**
   * Add parent node to the given node and implicitly add given node to the parent node as a child.
   * @return {Dag} this dag
   */
  setParenthood(child: I, parent: I): Dag<I> {
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
   * @return {Dag<I>>} this dag
   */
  removeParenthood(child: I, parent: I): Dag<I> {
    if(!this._nodes.has(child)) throw new Error("Child node doesn't belong to this graph");
    if(!this._nodes.has(parent)) throw new Error("Parent node doesn't belong to this graph");

    this.getParents(child).delete(parent);
    this.getChildren(parent).delete(child);

    return this;
  }

  private checkCycle(child: I, parent: I) {
    if(this.isDescendant(child, parent)) {
      throw new Error("The Parent-child relationship is not possible: this parenthood establishing leads to a cycle");
    }
  }

  isDescendant(current: I, tested: I) {
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
