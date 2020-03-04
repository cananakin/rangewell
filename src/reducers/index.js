import { ADD_DEAL, RENDER_DEAL_LIST, EDIT_DEAL, DELETE_DEAL } from '../actions';

const initialState = {
  deals: [],
  payload: '',
  stats: []
};

export default function dealApp(state = initialState, action) {
  switch (action.type) {
    case ADD_DEAL:
      return {
        ...state,
        payload: action.payload
      };
    case EDIT_DEAL:
      return {
        ...state,
        payload: action.payload
      };
    case DELETE_DEAL:
      return {
        ...state,
        payload: action.payload
      };
    case RENDER_DEAL_LIST:
      return {
        ...state,
        deals: action.deals,
        stats: action.stats
      };
    default:
      return state;
  }
}
