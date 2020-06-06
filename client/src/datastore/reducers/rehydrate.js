import { START_REHYDRATE, FINISH_REHYDRATE } from '../actions/rehydrate';

const initialState = {
  'isRehydrated': false,
};

export default function rehyrdate(state = initialState, action) {

  switch (action.type) {

    case START_REHYDRATE:
      return Object.assign({}, state, {
        'isRehydrated': action.isRehydrated,
      });
    case FINISH_REHYDRATE:
      return Object.assign({}, state, {
        'isRehydrated': action.isRehydrated,
      });
    default:
      return state;

  }

}
