import { v4 } from 'uuid'
import { UID } from '@dags/dag'

/**
 * Implements the UID interface that Dag requires.
 * @class Unique id
 */
export class UUID implements UID {
  private readonly _uuid!: string

  constructor() {
    this._uuid = v4()
  }

  newUID(): UID {
    return new UUID()
  }

  equals(uid: UID): boolean {
    return uid instanceof UUID && this._uuid === uid._uuid
  }
}
