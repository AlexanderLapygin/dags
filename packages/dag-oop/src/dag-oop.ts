/**
 * Provides DAG - Directed Acyclic Graph functionality in OOP style.
 */
import { Dag, UID } from '@dags/dag';

export class DagOop<T extends UID> {
  private _dag: Dag<T>;

  /**
   * Creates a DAG.
   * @class a Directed Acyclic Graph.
   * @constructor
   * @param dagUID uid of this dag
   */
  constructor(private uid: T) {
    this._dag = new Dag<T>(uid)
  }

  /**
   * @return nodeset of this dag
   */
  getNodes(): Set<T> {
    return this._dag.getNodes();
  }

}
