import {addError, removeError} from '../errorActionCreators';
import {setCurrentUser} from './authActionCreators';
import manageAuthResponse from '../../../services/manageAuthResponse';
import apiCall from '../../../services/api';

const authUser = (type, userData) => {
	return dispatch => {
		return apiCall('post', `/api/auth/${type}`, userData)
			// Transform data with function pipeline,
			// appropriately configuring client along
			// the way
			.then(res => manageAuthResponse(res))

			// Dispatch transformed data
			.then(user => {
				dispatch(setCurrentUser(user));
				dispatch(removeError());
			})
			
			.catch(err => {
				dispatch(addError(err));
			})
	}
};

export default authUser;