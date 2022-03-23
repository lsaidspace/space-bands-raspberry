import { Characteristic } from '@abandonware/noble';

type callback = (data: Buffer) => void;

export default function listener(characteristic: Characteristic, cb: callback) {
  characteristic.on('data', cb);
  characteristic.subscribe();
}
