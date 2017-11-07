import { Server } from 'mock-socket';
import Constants from './constants';
export const mockServer = new Server('ws://localhost:8888');

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

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
      setInterval(function () {
        mockServer.send({
          event: Constants.ServerEvents.SENSOR_UPDATED,
          data: {
            _id: '5937b05823d3e908cc271eab',
            currentValue: randomIntFromInterval(300, 600)
          }
        });
      }, 5000);
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
          resources: ['bla'],
          value: 0
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
