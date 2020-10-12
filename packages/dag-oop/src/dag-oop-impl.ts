/**
 * Provides DAG - Directed Acyclic Graph functionality in OOP style.
 */
import { DagNode } from './node';

export interface DagOop {
  /**
   * @return nodeset of this dag
   */
  getNodes(): Set<DagNode>;

  /**
   * Create new node of this graph.
   * @return {DagOop} uid of the new node
   */
  addNode(): DagOop;

  /**
   * Create new node of this graph.
   * @return {DagOop} uid of the new node
   */
  addNode(): DagOop;
}

export class DagOopImpl implements DagOop {
  /**
   * Creates a DAG.
   * @class a Directed Acyclic Graph.
   * @constructor
   * @param dagUID uid of this dag
   */
  constructor(private uid: T) {}

  getNodes(): Set<DagNode> {
    throw new Error('unimplemented');
  }

  addNode(): DagOop {
    throw new Error('unimplemented');
  }
}
