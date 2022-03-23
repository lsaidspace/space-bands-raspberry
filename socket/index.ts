import { io, Socket } from 'socket.io-client';
import { restartScan, startScanning } from '../bluetooth/scanner';
import { ConnectionInstructions } from './types';

const socket: Socket = io('http://localhost:3000', {
  auth: {
    branchId: process.env.BRANCH_ID,
  },
});

socket.emit('message', { hola: true });

socket.on('start-scan', (instructions: ConnectionInstructions) => {
  startScanning(instructions);
});

socket.on('restart-scan', (instructions: ConnectionInstructions) => {
  restartScan(instructions);
});

export default socket;
