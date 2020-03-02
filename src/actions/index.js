export const ADD_DEAL = 'ADD_DEAL';
export const EDIT_DEAL = 'EDIT_DEAL';
export const DELETE_DEAL = 'DELETE_DEAL';
export const LOAD_DEAL_LIST = 'LOAD_DEAL_LIST';
export const RENDER_DEAL_LIST = 'RENDER_DEAL_LIST';
export const FIND_DEAL_ID = 'FIND_DEAL_ID';

export const addDealAction = payload => ({ type: ADD_DEAL, payload: payload });
export const editDealAction = (payload, id) => ({
  type: EDIT_DEAL,
  payload: payload,
  id: id
});
export const deleteDealAction = id => ({ type: DELETE_DEAL, id: id });
export const loadDealList = () => ({ type: LOAD_DEAL_LIST });
export const findDealId = payload => ({ type: FIND_DEAL_ID, payload: payload });
