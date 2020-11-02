/**
 * Provides DAG - Directed Acyclic Graph functionality for local use.
 */
import { DagBase } from '@dags/dag-base'
import { UIDLocal } from '@dags/uid-local'

export class DagLocal extends DagBase {
  constructor() {
    super(UIDLocal)
  }
}
