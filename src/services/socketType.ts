// Define the interface for the SocketClient
export interface SocketClient {
  emit(event: string, message: string): void;
  addHandler(event: string, handler?: any): void;
  removeHandler(event: string, handler?: any): void;
  connect(): void;
  disconnect(callback?: () => unknown): void;
  on(
    event: 'connect' | 'disconnect' | 'reconnect' | 'error' | 'connect_error',
    handler: (arg: any) => void
  ): void;
}
