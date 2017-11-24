import { WebSocket } from 'mock-socket';

export const ServerEventDispatcher = (url) => {
  const conn = new WebSocket(url);

  const callbacks = {};

  const dispatch = (event_name, message) => {
    const chain = callbacks[event_name];
    if (typeof chain === 'undefined') return; // no callbacks for this event
    for (let i = 0; i < chain.length; i++){
      chain[i](message);
    }
  };

  this.bind = (event_name, callback) => {
    callbacks[event_name] = callbacks[event_name] || [];
    callbacks[event_name].push(callback);
    return this;// chainable
  };

  this.send = (event_name, event_data) => {
    const payload = JSON.stringify({event: event_name, data: event_data});
    conn.send(payload); // <= send JSON data to socket server
    return this;
  };

  // dispatch to the right handlers
  conn.onmessage = (evt) => {
    dispatch(evt.data.event, evt.data.data);
  };

  conn.onclose = () => {dispatch('close', null);};
  conn.onopen = () => {dispatch('open', null);};

  return this;
};
