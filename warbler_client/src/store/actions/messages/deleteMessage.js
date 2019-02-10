import {loadMessages} from './messageActionCreators';
import {addError} from '../errorActionCreators';
import apiCall from '../../../services/api';


const deleteMessage = (userIdForRemoval, msgIdForRemoval) => {
	return (dispatch, getState) => {
		const {messages} = getState();
		return apiCall('delete', `/api/users/${userIdForRemoval}/messages/${msgIdForRemoval}`)
			.then(removedMessage => {
				const updatedMessages = messages.filter(msg => msg._id !== msgIdForRemoval);
				dispatch(loadMessages(updatedMessages));
			})
			.catch(err => {
				dispatch(addError(err));
			})
	}
};

export default deleteMessage;