/**
 * Required interface for UID Constructor
 */
export interface UIDConstructor {
  new (): UID
}

/**
 * Required interface for UID
 */
export interface UID {
  /**
   * Check equality to the given UID
   * @param uid
   */
  equals(uid: UID): boolean
}

/**
 * Common interface of the Dag
 */
export interface DagCommon {
  /**
   * Obtain nodeset of this dag
   * @return {Set<UID>} nodeset of this dag
   */
  getNodes(): Set<UID>

  /**
   * Delete a node from nodeset of this dag.
   * @return {DagGateway} itself.
   * @param node
   */
  deleteNode(node: UID): DagOut

  /**
   * Obtain parents of the given node.
   * @param node
   * @return {Set<UID>} parents of the given node.
   */
  getParents(node: UID): Set<UID>

  /**
   * Obtain children of the given node.
   * @return {Set<UID>} children of the given node.
   * @param node a given node
   */
  getChildren(node: UID): Set<UID>

  /**
   * Add parent node to the given node and implicitly add given node to the parent node as a child.
   * @return {DagGateway} itself
   */
  setParenthood(parent: UID, child: UID): DagOut

  /**
   * Remove parent node to the given node and implicitly remove given node to the parent node as a child.
   * @return {DagGateway} itself
   */
  removeParenthood(parent: UID, child: UID): DagOut

  /**
   * Checking if the node being checked is a descendant or not.
   * @param current current node.
   * @param tested tested node.
   * @return {boolean} true if tested node is descendant of current node and false otherwise
   */
  isDescendant(current: UID, tested: UID): boolean
}

/**
 * In interface of Dag
 */
export interface DagIn extends DagCommon {
  /**
   * Create a node of this dag.
   * @return {UID} id of the node.
   */
  newNode(): UID
}

/**
 * Out interface of Dag
 */
export interface DagOut extends DagCommon {
  /**
   * Add node to this dag.
   * @return {DagOut} itself
   */
  addNode(node: UID): DagOut
}

/**
 * Provides DAG - Directed Acyclic Graph functionality.
 */
export class DagBase implements DagIn, DagOut {
  /**
   * Id of this dag
   * @type {Set}
   * @public
   */
  public readonly id: UID

  /**
   * Creates a DAG.
   * @class a Directed Acyclic Graph.
   * @constructor
   * @param gateway dag gateway
   * @param uid constructor for UIDs
   */
  constructor(private gateway: DagOut, public uid: UIDConstructor) {
    this.id = new uid()
  }

  /**
   * Create new node of this graph.
   * @return {UID} uid of the new node
   */
  newNode(): UID {
    const nodeUID: UID = new this.uid()
    this.gateway.addNode(nodeUID)
    return nodeUID
  }

  addNode(node: UID): DagOut {
    throw new Error('Unsupported method in this implementation. Use newNode instead, please!')
  }

  deleteNode(node: UID): DagOut {
    this.gateway.deleteNode(node)
    return this
  }

  getNodes(): Set<UID> {
    return this.gateway.getNodes()
  }

  getParents(node: UID): Set<UID> {
    return this.gateway.getParents(node)
  }

  getChildren(node: UID): Set<UID> {
    return this.gateway.getChildren(node)
  }

  setParenthood(parent: UID, child: UID): DagOut {
    this.gateway.setParenthood(parent, child)
    return this
  }

  removeParenthood(parent: UID, child: UID): DagOut {
    this.gateway.removeParenthood(parent, child)
    return this
  }

  isDescendant(current: UID, tested: UID) {
    return this.gateway.isDescendant(current, tested)
  }
}
