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
 * Required interface for Gateway
 */
export interface DagGateway {
  /**
   * Add node to this dag.
   * @return {DagGateway} itself
   */
  addNode(node: UID): DagGateway

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
  deleteNode(node: UID): DagGateway

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
  setParenthood(parent: UID, child: UID): DagGateway

  /**
   * Remove parent node to the given node and implicitly remove given node to the parent node as a child.
   * @return {DagGateway} itself
   */
  removeParenthood(parent: UID, child: UID): DagGateway

  /**
   * Checking if the node being checked is a descendant or not.
   * @param current current node.
   * @param tested tested node.
   * @return {boolean} true if tested node is descendant of current node and false otherwise
   */
  isDescendant(current: UID, tested: UID): boolean
}

/**
 * Provides DAG - Directed Acyclic Graph functionality.
 */
export class DagBase {
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
  constructor(private gateway: DagGateway, public uid: UIDConstructor) {
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

  /**
   * Delete a node from nodeset of this graph.
   * @return {DagBase} this graph.
   * @param node
   */
  deleteNode(node: UID): DagBase {
    this.gateway.deleteNode(node)
    return this
  }

  /**
   * @return nodeset of this dag
   */
  getNodes(): Set<UID> {
    return this.gateway.getNodes()
  }

  /**
   * Obtain parents of the given node.
   * @param node
   * @return parents of the given node.
   */
  getParents(node: UID): Set<UID> {
    return this.gateway.getParents(node)
  }

  /**
   * Obtain children of the given node.
   * @param node
   * @return children of the given node.
   */
  getChildren(node: UID): Set<UID> {
    return this.gateway.getChildren(node)
  }

  /**
   * Add parent node to the given node and implicitly add given node to the parent node as a child.
   * @return {DagBase} this dag
   */
  setParenthood(parent: UID, child: UID): DagBase {
    this.gateway.setParenthood(parent, child)
    return this
  }

  /**
   * Remove parent node from the given node and implicitly remove the given node.
   * from the parent node as a child.
   * @return {DagBase} this dag
   */
  removeParenthood(parent: UID, child: UID): DagBase {
    this.gateway.removeParenthood(parent, child)
    return this
  }

  /**
   * Checking if the node being checked is a descendant or not.
   * @param current current node.
   * @param tested tested node.
   */
  isDescendant(current: UID, tested: UID) {
    return this.gateway.isDescendant(current, tested)
  }
}
