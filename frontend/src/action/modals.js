import Constants from '../constants';

export const showModal = (modalType, modalProps) => {
  return { type: Constants.Actions.SHOW_MODAL, modalType, modalProps };
};

export const hideModal = modalType => {
  return { type: Constants.Actions.HIDE_MODAL, modalType };
};
