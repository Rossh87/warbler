import manageAuthResponse from '../../../services/manageAuthResponse';
import {loadMessages} from '../messages/messageActionCreators';
import {LOGOUT_CURRENT_USER} from '../../actionTypes';

const logout = () => {
	return dispatch => {
		manageAuthResponse();
		dispatch({type: LOGOUT_CURRENT_USER});
		dispatch(loadMessages([]))
	}
}

export default logout;