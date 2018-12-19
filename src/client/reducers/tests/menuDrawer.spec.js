import expect from 'expect';
import { menuDrawer } from '../menuDrawer';
import Constants from '../../constants/';

describe('menuDrawer reducer', () => {
  it('should return the initial state', () => {
    expect(menuDrawer(undefined, {})).toEqual({ open: false });
  });

  it('should open the drawer', () => {
    const action = { type: Constants.Actions.OPEN_MENU_DRAWER };
    expect(menuDrawer({ open: false }, action)).toEqual({ open: true });
  });

  it('should close the drawer', () => {
    const action = { type: Constants.Actions.CLOSE_MENU_DRAWER };
    expect(menuDrawer({ open: true }, action)).toEqual({ open: false });
  });
});
