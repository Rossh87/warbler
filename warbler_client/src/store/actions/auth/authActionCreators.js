import {SET_CURRENT_USER, SET_ACTIVE_USER, SET_AUTH_EXPIRATION} from '../../actionTypes';

export const setAuthExpiration = (authExp) => {
	return {
		type: SET_AUTH_EXPIRATION,
		authExp
	};
};

export const setCurrentUser = (currentUser) => {
	return {
		type: SET_CURRENT_USER,
		currentUser
	};
};

export const setActiveUser = (isActive) => {
	return {
		type: SET_ACTIVE_USER,
		isActive
	};
};
