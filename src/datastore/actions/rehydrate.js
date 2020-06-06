// Rehydrate Section
export const START_REHYDRATE = 'START_REHYDRATE';
export const FINISH_REHYDRATE = 'FINISH_REHYDRATE';

export const startRehydrate = () => {

  return {
    'type': START_REHYDRATE,
    'isRehydrated': false,
  };

};

const finishRehydrate = () => {

  return {
    'type': FINISH_REHYDRATE,
    'isRehydrated': true,
  };

};

export const actionRehydrate = () => {

  return (dispatch) => {

    dispatch(finishRehydrate());

  };

};
