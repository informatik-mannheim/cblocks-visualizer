import expect from 'expect';
import settings from '../settings';
import Constants from '../../constants/';
import deepFreeze from 'deep-freeze';

const initialState = {
  URLs: {
    base: '37.61.204.167:8081',
    MQTT: '172.16.1.1:1884',
    fetchSensorRoute: 'cblocks',
    categoryMappingRoute: 'category',
    rangeMappingRoute: 'range',
    labelMappingRoute: 'label'
  }
};
deepFreeze(initialState);

describe('settings reducer', () => {
  it('should return the initial state', () => {
    expect(settings(undefined, {})).toEqual(initialState);
  });

  it('should change the base URL', () => {
    expect(
      settings(initialState, {
        type: Constants.Actions.CHANGE_URL,
        urlType: 'base',
        value: 'test.test'
      })
    ).toEqual({
      URLs: {
        base: 'test.test',
        MQTT: '172.16.1.1:1884',
        fetchSensorRoute: 'cblocks',
        categoryMappingRoute: 'category',
        rangeMappingRoute: 'range',
        labelMappingRoute: 'label'
      }
    });
  });

  it('should change the MQTT URL', () => {
    expect(
      settings(initialState, {
        type: Constants.Actions.CHANGE_URL,
        urlType: 'MQTT',
        value: 'test.test'
      })
    ).toEqual({
      URLs: {
        base: '37.61.204.167:8081',
        MQTT: 'test.test',
        fetchSensorRoute: 'cblocks',
        categoryMappingRoute: 'category',
        rangeMappingRoute: 'range',
        labelMappingRoute: 'label'
      }
    });
  });
});
