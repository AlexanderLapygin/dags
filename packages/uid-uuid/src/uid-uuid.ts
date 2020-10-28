import { v4 } from 'uuid'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UID } from '@dags/dag-base'

/**
 * Implements the UID interface that Dag requires.
 * @class Unique id
 */
export class UUID implements UID {
  private readonly _uuid!: string

  constructor() {
    this._uuid = v4()
  }

  equals(uid: UID): boolean {
    return uid instanceof UUID && this._uuid === uid._uuid
  }
}
