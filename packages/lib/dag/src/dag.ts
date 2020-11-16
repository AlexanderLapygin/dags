/**
 * Provides DAG - Directed Acyclic Graph functionality for global use.
 */
import { DagBase } from '@dags/dag-base'
import { UUID } from '@dags/uid-uuid'
import { DagGatewayRest } from '@dags/dag-gateway-rest'

export class Dag extends DagBase {
  constructor() {
    super(new DagGatewayRest(), UUID)
  }
}
