/**
 * Provides DAG - Directed Acyclic Graph functionality for global use.
 */
import { DagBase } from '@dags/dag-base'
import { UUID } from '@dags/uid-uuid'

export class DagGlobal extends DagBase {
  constructor() {
    super(UUID)
  }
}
