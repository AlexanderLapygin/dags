import { v4 } from 'uuid';

/**
 * @class Uid
 */

export class UID implements DagUID {
  private readonly _uuid!: string;

  constructor() {
    this._uuid = v4();
  }

  equals(uid: UID): boolean {
    return this._uuid === uid._uuid;
  }
}
