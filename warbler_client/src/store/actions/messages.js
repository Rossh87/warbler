import {apiCall} from '../../services/api';
import {addError} from './error';
import {LOAD_MESSAGES, REMOVE_MESSAGE} from '../actionTypes';

export const loadMessages = messages => ({
	type: LOAD_MESSAGES,
	messages	
});

export const deleteMessage = idForRemoval => {
	return (dispatch, getState) => {
		const {currentUser, messages} = getState();
		const userId = currentUser.user.id;
		apiCall('delete', `/api/users/${userId}/messages/${idForRemoval}`)
			.then(removedMessage => {
				const updatedMessages = messages.filter(msg => msg.id !== idForRemoval);
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

