import openSocket, { Socket } from 'socket.io-client';

import { SocketClient } from './socketType';

// eslint-disable-next-line import/order
import { getHostUrl } from '@/utils';

const urlString = getHostUrl() as string; // 'http://localhost:8000/api/v1';
const urlParts = urlString.split('/');
const SOCKET_SERVER_URL = `${urlParts[0]}//${urlParts[2]}`; // "http://localhost:8000"

// Function to create a SocketClient instance
export const createSocketClient = (): SocketClient => {
  // Create a new socket instance with the given options
  const socket: Socket = openSocket(
    process.env.NODE_ENV === 'development' ? SOCKET_SERVER_URL : SOCKET_SERVER_URL,
    {
      reconnection: true,
      reconnectionDelay: 3000,
      reconnectionDelayMax: 7000,
      reconnectionAttempts: Infinity,
      autoConnect: true,
      timeout: 10000,
      transports: ['polling', 'websocket'],
    }
  );

  // Log when the socket connects
  socket.on('connect', () => {
    console.log('[SOCKET] connected');
  });

  // Log when the socket disconnects
  socket.on('disconnect', () => {
    console.log('[SOCKET] disconnect');
  });

  // Log when the socket reconnects
  socket.on('reconnect', () => {
    console.log('[SOCKET] reconnect');
  });

  // Log when there is an error
  socket.on('error', (err: any) => {
    console.log('[SOCKET] received socket error', err);
  });

  // Log when there is a connection error
  socket.on('connect_error', (err: any) => {
    console.log('[SOCKET] received socket connect error', err);
  });

  // Open the socket
  socket.open();

  // Define the functions of the SocketClient interface
  const emit = (event: string, message: string) => {
    console.log(`[SOCKET] emit to "${event}" with message ${message}`);
    socket.emit(event, message);
  };

  const connect = () => {
    socket.connect();
  };

  const disconnect = (callback?: () => any) => {
    socket.disconnect();
    if (callback) callback();
  };

  const addHandler = (event: string, handler: any) => {
    console.log('[SOCKET] registerHandler >', event.replace(/_/g, ' '));
    socket.on(event, handler);
  };

  const removeHandler = (event: string, handler?: any) => {
    console.log('[SOCKET] removeHandler >', event.replace(/_/g, ' '));
    if (!handler) {
      socket.off(event);
    } else {
      socket.off(event, handler);
    }
  };

  const on = (event: string, handler: any) => {
    console.log('[SOCKET] on >', event.replace(/_/g, ' '));
    socket.on(event, handler);
  };

  // Return an object with the SocketClient interface functions
  return {
    emit,
    addHandler,
    removeHandler,
    connect,
    disconnect,
    on,
  };
};

// Export the createSocketClient function as default
export default createSocketClient;
