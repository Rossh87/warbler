import {SET_CURRENT_USER, SET_ACTIVE_USER, SET_AUTH_EXPIRATION, LOGOUT_CURRENT_USER} from '../actionTypes';

const DEFAULT_STATE = {
	isAuthenticated: false,
	isActive: true
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !!Object.keys(action.currentUser).length,
				...action.currentUser
			};

		case SET_ACTIVE_USER:
			return {
				...state,
				isActive: action.isActive
			};

		case SET_AUTH_EXPIRATION:
			return {
				...state,
				authExp: action.authExp
			};

		case LOGOUT_CURRENT_USER:
			return DEFAULT_STATE;

		default:
			return state;
			
	}
}