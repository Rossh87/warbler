import {apiCall} from '../../services/api';
import {addError} from './error';
import {LOAD_MESSAGES} from '../actionTypes';

export const loadMessages = messages => ({
	type: LOAD_MESSAGES,
	messages	
});

export const deleteMessage = (userIdForRemoval, msgIdForRemoval) => {
	return (dispatch, getState) => {
		const {messages} = getState();
		apiCall('delete', `/api/users/${userIdForRemoval}/messages/${msgIdForRemoval}`)
			.then(removedMessage => {
				const updatedMessages = messages.filter(msg => msg._id !== msgIdForRemoval);
				dispatch(loadMessages(updatedMessages));
			})
			.catch(err => {
				dispatch(addError(err.message));
			})
	}
}

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
}

export const postNewMessage = text => {
	return (dispatch, getState) => {
		let {currentUser} = getState();
		const id = currentUser.user.id;
		return apiCall('post', `/api/users/${id}/messages`, {text})
			.then(newMessage => {
			})
			.catch(err => {
				if(err.message){
					dispatch(addError(err.message))
				} else {
					dispatch(addError(err))
				}
			});
	}
}

