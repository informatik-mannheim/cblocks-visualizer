import { Server } from 'mock-socket';
import Constants from './constants';
export const mockServer = new Server('ws://localhost:8888');

mockServer.on('connection', server => {

  const welcomeMessage = {
    event: Constants.ServerEvents.CONNECTION_ESTABLISHED,
    data: null
  };

  mockServer.send(welcomeMessage);
});

mockServer.on('message', event => {
  const eventJSON = JSON.parse(event);

  switch (eventJSON.event) {
    case 'init':
      mockServer.send({
        event: Constants.ServerEvents.NODE_ADDED,
        data: {
              _id: 'node1_id'
            }
      });
      mockServer.send({
        event: Constants.ServerEvents.NODE_ADDED,
        data: {
              _id: 'node2_id'
            }
      });
      mockServer.send({
        event: Constants.ServerEvents.SENSOR_ADDED,
        data: {
          _id: '5937b05823d3e908cc271eab'
        }
      });
      break;
    case 'get_node':
      console.log(eventJSON.data);
      break;
    case 'get_node_status':
      console.log(eventJSON.data);

      let nodeStatus = null;
      if (eventJSON.data._id === 'node1_id') {
        nodeStatus = {
          _id: 'node1_id',
          label: 'Window',
          sensors: [
            '5937b0582ldor908cc271eab'
          ]
        };
      } else if (eventJSON.data._id === 'node2_id') {
        nodeStatus = {
          _id: 'node2_id',
          label: 'Coffeemaker',
          sensors: [
          ]
        };
      }
      mockServer.send({
          event: Constants.ServerEvents.NODE_STATUS,
          data: nodeStatus
      });

      break;
    case 'get_sensor':
      console.log(eventJSON.data);
      break;
    case 'get_sensor_status':
      console.log(eventJSON.data);
      let sensorStatus = null;
      if (eventJSON.data._id === '5937b05823d3e908cc271eab') {
        sensorStatus = {
          _id: '5937b05823d3e908cc271eab',
          label: 'Pressure Sensor',
          resources: ['bla']
        };
      }
      mockServer.send({
          event: Constants.ServerEvents.SENSOR_STATUS,
          data: sensorStatus
      });
      break;

    default:
    return;
  }
});

/*
_id: '59510e6f8eed6e32225aasdf'
label: 'Window',
sensors: [
  '5937b0582ldor908cc271eab'
]


{
      _id: '59510e6f8eed6eodje6hsdf',
      label: 'Coffeemaker',
      sensors: [
      ]
    }
*/
