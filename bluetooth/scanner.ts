import noble, { Peripheral } from '@abandonware/noble';
import { ConnectionInstructions } from '../socket/types';
import handleDevice from './handleDevice';

export async function startScanning({
  addresses,
  characteristicsInfo,
}: ConnectionInstructions) {
  noble.on('discover', (peripheral: Peripheral) => {
    if (!addresses.includes(peripheral.address)) return;
    handleDevice(peripheral, characteristicsInfo);
  });
  await noble.startScanningAsync();
}

export async function restartScan(instructions: ConnectionInstructions) {
  await noble.stopScanningAsync();
  startScanning(instructions);
}
