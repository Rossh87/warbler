import {ADD_ERROR, REMOVE_ERROR} from '../actionTypes';

const DEFAULT_STATE = {
	message: null,
	signInRequired: false
}

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case ADD_ERROR:
			return {
				...state, 
				message: action.error.message,
				signInRequired: action.error.signInRequired
			};

		case REMOVE_ERROR:
			return {...state, message: null, signInRequired: false}; 

		default: 
			return state;
	}
}