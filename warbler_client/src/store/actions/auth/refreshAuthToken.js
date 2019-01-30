import {addError} from '../error';
import {setAuthExpiration} from './authActionCreators';
import manageAuthResponse from '../../../services/manageAuthResponse';
import apiCall from '../../../services/api';

const refreshAuthToken = () => {
	return dispatch => {
	 	return apiCall('post', '/api/auth/refresh')

	 		// Set client state to reflect new token
	 		.then(manageAuthResponse)

	 		// MAR returns object with user info (if any) + property 'authExp'
	 		// that reflects expiration of the token in the object it received
	 		.then(({authExp}) => {
				dispatch(setAuthExpiration(authExp));
	 		})

	 		.catch(err => {
	 			dispatch(addError(err));
	 		});
	};
};

export default refreshAuthToken;