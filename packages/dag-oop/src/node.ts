/**
 * Provides DAG - Directed Acyclic Graph functionality in OOP style.
 */
import { UUID } from '@dags/uid-uuid';

export interface DagNode {
  /**
   * Adds a child to this node
   * @param child
   * @return {DagNode} this node
   */
  addChild(child: DagNode): DagNode;

  /**
   * Remove a child from this node
   * @param child
   * @return {DagNode} this node
   */
  removeChild(child: DagNode): DagNode;

  /**
   * Returns child set of this node
   */
  getChildren(): Set<DagNode>;

  /**
   * Adds a parent to this node
   * @param parent
   * @return {DagNode} this node
   */
  addParent(parent: DagNode): DagNode;

  /**
   * Remove a parent from this node
   * @param parent
   * @return {DagNode} this node
   */
  removeParent(parent: DagNode): DagNode;

  /**
   * Returns parent set of this node
   */
  getParents(): Set<DagNode>;
}

export class DagNodeImpl implements DagNode {
  /**
   * Creates a dag node.
   * @class a dag node.
   * @constructor
   * @param _id id of this node
   */
  private constructor(private readonly _id: UUID) {}

  getId(): UUID {
    return this._id;
  }

  getChildren(): Set<DagNode> {
    throw new Error("unimplemented");
  }

  addChild(child: DagNode): DagNode {
    throw new Error("unimplemented");
  }

  addParent(parent: DagNode): DagNode {
    throw new Error("unimplemented");
  }

  getParents(): Set<DagNode> {
    throw new Error("unimplemented");
  }

  removeChild(child: DagNode): DagNode {
    throw new Error("unimplemented");
  }

  removeParent(parent: DagNode): DagNode {
    throw new Error("unimplemented");
  }
}
