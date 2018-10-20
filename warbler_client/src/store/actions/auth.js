import {apiCall, setTokenHeader} from '../../services/api';
import {SET_CURRENT_USER, SET_ACTIVE_USER, SET_AUTH_EXPIRATION} from '../actionTypes';
import {addError, removeError} from './error';
import {loadMessages} from './messages';
import jwtDecode from 'jwt-decode';

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	};
};

export function setActiveUser(isActive) {
	return {
		type: SET_ACTIVE_USER,
		isActive
	};
};

export function setAuthExpiration(exp) {
	return {
		type: SET_AUTH_EXPIRATION,
		exp
	};
}

export function setAuthorizationToken(token) {
	// configure axios with correct bearer auth header
	setTokenHeader(token);
}

// export function verifyRefresh() {



// 	if(localStorage.jwtToken) {
// 		const { exp } = jwtDecode(localStorage.jwtToken);
// 		const current = Math.floor(Date.now() / 1000);
// 		const staleToken = (exp - current) < 30;

// 		if (currentUser.isActive && staleToken) {
// 			try {
// 				refreshAuthorizationToken();
// 				console.log('refresh');
// 			} 

// 			catch (err) {
// 				console.log(err);
// 			}
// 		}
// 	}
// }

export function refreshAuthorizationToken() {
	debugger;
	return dispatch => {
	 	apiCall('post', '/api/auth/refresh')
	 		.then(({token}) => {
	 			localStorage.setItem('jwtToken', token);
	 			setAuthorizationToken(token);
	 			const {exp} = jwtDecode(token);
				dispatch(setAuthExpiration(exp));
				debugger;
	 		})
	 		.catch(err => {
	 			dispatch(addError(err));
	 		});
	};
}

export function logout() {
	return dispatch => {
		localStorage.clear();
		setTokenHeader(false);
		dispatch(setCurrentUser({}));
		dispatch(loadMessages([]));
	}
}

export function authUser(type, userData) {
	return dispatch => 
		new Promise((resolve, reject) => 
			apiCall('post', `/api/auth/${type}`, userData)
				.then( ({token, ...user}) => {
					const {exp} = jwtDecode(token);
					localStorage.setItem('jwtToken', token);
					setTokenHeader(token);
					dispatch(setCurrentUser(user));
					dispatch(setAuthExpiration(exp))
					dispatch(removeError());
					resolve();
				})
				.catch(err => {
					dispatch(addError(err));
					reject();
				})
		);
}