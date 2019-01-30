import {loadMessages} from './messageActionCreators';
import apiCall from '../../../services/api';
import {addError} from '../error';


export const fetchMessages = () => {
	return dispatch => {
		return apiCall('get', '/api/messages')
			.then(foundMessages => {
				dispatch(loadMessages(foundMessages))
			})
			.catch(err => {
				if(err.message){
					dispatch(addError(err.message))
				} else {
					dispatch(addError(err))
				}
			});
	}
};

export default fetchMessages;