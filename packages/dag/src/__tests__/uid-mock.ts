import { UID } from '../dag';

export class UIDMock implements UID {
  private static _counter = 0;
  private readonly _id: number;

  constructor() {
    this._id = UIDMock._counter++;
  }

  newUID(): UID {
    return new UIDMock();
  }

  equals(uid: UID): boolean {
    return uid instanceof UIDMock && this._id === uid._id;
  }
}
