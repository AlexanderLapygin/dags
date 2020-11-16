/**
 * Provides DAG - Directed Acyclic Graph functionality for local use.
 */
import { DagBase } from '@dags/dag-base'
import { UIDLocal } from '@dags/uid-local'
import { DagGatewayInMemory } from '@dags/dag-gateway-in-memory'

export class DagLocal extends DagBase {
  constructor() {
    super(new DagGatewayInMemory(), UIDLocal)
  }
}
