import { Peripheral } from '@abandonware/noble';
import { CharacteristicInfo } from '../socket/types';
import socket from '../socket';
import listener from './listener';

export default async function handleDevice(
  device: Peripheral,
  characteristicsInfo: CharacteristicInfo[],
) {
  await device.connectAsync();

  characteristicsInfo.forEach(async ({ path, listen }) => {
    const [serviceUUID, charUUID] = path;
    const getChars = device.discoverSomeServicesAndCharacteristicsAsync;
    const { characteristics: [char] } = await getChars([serviceUUID], [charUUID]);
    if (!listen) return;
    listener(char, (data) => {
      socket.emit(`char-data-${charUUID}`, {
        deviceAddress: device.address,
        charData: data,
      });
    });
  });
}
