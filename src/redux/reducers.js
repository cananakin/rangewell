import * as Type from "./actions-types";

const initialState = {
	model: [],
	message: '',
	deals:[]
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case Type.ADD_DEAL:
			return {
				...state,
				model: action.model
			}
		case Type.EDIT_DEAL:
			return {
				...state,
				model: action.model
			}
		case Type.GET_DEALS:
			return {
				...state,
				deals: action.deals
			}
		case Type.DEAL_MESSAGE:
			return {
				...state,
				message: action.message
			}
		default:
			return state;
	}
};

export default rootReducer;