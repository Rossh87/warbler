import apiCall from '../../../services/api';
import {addError} from '../errorActionCreators';

export const postNewMessage = text => {
	return (dispatch, getState) => {
		let {currentUser} = getState();
		const id = currentUser.id;
		return apiCall('post', `/api/users/${id}/messages`, {text})
			.catch(err => {
				if(err.message){
					dispatch(addError(err.message))
				} else {
					dispatch(addError(err))
				}
			});
	}
};

export default postNewMessage;
