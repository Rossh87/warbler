import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

export default mockStore;

export const mockMessages = [
	{
		_id: 1,
		message: 'message1'
	},

	{
		_id: 2,
		message: 'message2'
	},

	{
		_id: 3,
		message: 'message3'
	}
];

export const mockUser = {
	id: 1
};