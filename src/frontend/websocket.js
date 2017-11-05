import { WebSocket, Server } from 'mock-socket';

export function Chat () {
  const chatSocket = new WebSocket('ws://localhost:8888');
  this.messages = [];

  chatSocket.onmessage = (event) => {
    console.log(event.data);
    this.messages.push(event.data);
  };
}

export const mockServer = new Server('ws://localhost:8888');
mockServer.on('connection', server => {
  mockServer.send('test message 1');
  mockServer.send('test message 2');
  console.log('websocket connect');
});

mockServer.on();
// Now when Chat tries to do new WebSocket() it
// will create a MockWebSocket object \
const chatApp = new Chat();
