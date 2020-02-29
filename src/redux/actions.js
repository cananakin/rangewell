import * as Type from "./actions-types";

export const addDealAction = (model) =>({type: Type.ADD_DEAL, model:model});
export const editDealAction = (model,id) =>({type: Type.EDIT_DEAL, model:model,id:id});
export const getDealsAction = () =>({type: Type.GET_DEALS});
