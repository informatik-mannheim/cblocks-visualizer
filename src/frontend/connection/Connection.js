import {WebSocket} from 'mock-socket';
import {ServerEventDispatcher} from './ServerEventDispatcher';
import Constants from '../constants/';
import store from '../store';
import * as action from '../action/';
/*
Simplified WebSocket events dispatcher (no channels, no users)
var socket = new FancyWebSocket();
// bind to server events
socket.bind('some_event', function(data){
  alert(data.name + ' says: ' + data.message)
});
// broadcast events to all connected users
socket.send( 'some_event', {name: 'ismael', message : 'Hello world'} );
*/

export const connectToServer = (url) => {
  const socket = ServerEventDispatcher(url);
  const serverEvents = Constants.ServerEvents;

  socket.bind(serverEvents.NODE_ADDED, (node) => {
    store.dispatch(action.addNode(node));
  });
};


export function Chat () {
  const chatSocket = new WebSocket('ws://localhost:8888');
  this.messages = [];

  chatSocket.onmessage = (event) => {
    console.log(event.data);
    this.messages.push(event.data);
  };
}
//const chatApp = new Chat();
