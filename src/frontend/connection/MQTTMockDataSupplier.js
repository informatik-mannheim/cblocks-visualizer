import { connect } from 'mqtt';

const MQTTMockDataSupplier = (url) => {
  const client = connect(url);
  const callbacks = {};

  this.bind = (event_name, callback) => {
    callbacks[event_name] = callbacks[event_name] || [];
    callbacks[event_name].push(callback);
    return this;
  };

  const randomIntFromInterval = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
  };

  client.on('connect', () => {
    client.publish('cblocks-ui-event-mocking', 'MQTT mockdata enabled');

    setTimeout(() => {
      client.publish('3304/1/status', 'online');
      setInterval(() => {
        client.publish('3304/1/0/output', '1');
        client.publish('3304/1/1/output', '{"red": 125, "green": 125, "blue": 125}');
      }, 500);
    }, 500);

  });

  return this;
};

export default MQTTMockDataSupplier;
