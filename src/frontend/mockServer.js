import { Server } from 'mock-socket';
import Constants from './constants';
export const mockServer = new Server('ws://localhost:8888');

mockServer.on('connection', server => {

  const welcomeMessage = {
    event: Constants.ServerEvents.CONNECTION_ESTABLISHED,
    data: null
  };

/*
const welcomeMessage = {
  event: Constants.ServerEvents.NODE_ADDED,
  data: {
        _id: '59510e6f8eed6e32225aasdf',
        label: 'Test',
        sensors: [
          '5937b0582ldor908cc271eab'
        ]
      }
};
*/
  mockServer.send(welcomeMessage);
});

mockServer.on('message', event => {
  const eventJSON = JSON.parse(event);
  console.log(eventJSON);
});
