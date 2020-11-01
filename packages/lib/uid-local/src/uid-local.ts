// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UID } from '@dags/dag-base'

/**
 * Implements the UID interface that Dag requires.
 * @class Unique id
 */
export class UIDLocal implements UID {
  private static _counter = 0
  private readonly _id: number

  constructor() {
    this._id = UIDLocal._counter++
  }

  equals(uid: UID): boolean {
    return uid instanceof UIDLocal && this._id === uid._id
  }
}
