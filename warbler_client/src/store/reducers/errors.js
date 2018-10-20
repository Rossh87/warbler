import {ADD_ERROR, REMOVE_ERROR} from '../actionTypes';

const defaultState = {
	message: null,
	signInRequired: false
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case ADD_ERROR:
			return {...state, message: action.error.message, signInRequired: action.error.signInRequired};

		case REMOVE_ERROR:
			return {...state, message: null, signInRequired: false}; 

		default: 
			return state;
	}
}