import Constants from '../constants';

const initialState = {
  open: false
};

export const menuDrawer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.Actions.OPEN_MENU_DRAWER:
      return { open: true };
    case Constants.Actions.CLOSE_MENU_DRAWER:
      return { open: false };
    default:
      return state;
  }
};
