// Get mocks
import mockStore from '../../../../__mocks__/storeMock.js';
import {authResponseWithImg} from '../../../../__mocks__/responseMocks.js';
import '../../../../__mocks__/localStorageMock.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Get local functions
import {SET_CURRENT_USER, SET_ACTIVE_USER, ADD_ERROR, REMOVE_ERROR} from '../../../actionTypes';

import authUser from '../authUser';

// utility
import jwtDecode from 'jwt-decode';

const store = mockStore({});
const api = new MockAdapter(axios, {delayResponse: 1000});



afterEach(() => {
	api.reset();
	store.clearActions();
});

describe('Async action creator authUser', () => {
	it('dispatches setCurrentUser with decoded api response data and dispatches removeError', () => {
		// configure mock response data
		api.onAny(/\/api\/auth\/.+/).reply(200, authResponseWithImg);

		const expected = {
			type: SET_CURRENT_USER,
			currentUser: {
				id: '10',
				username: 'rhunter',
				profileImageUrl: 'someImg@img.com',
				authExp: jwtDecode(authResponseWithImg.token).exp
			}
		};

		return store.dispatch(authUser('signup', {}))
			.then(() => {
				const actions = store.getActions();
				expect(actions[0]).toEqual(expected);
				expect(actions).toContainEqual({type: REMOVE_ERROR});
			});
	});

	it('dispatches any errors', () => {
		api.onAny(/\/api\/auth\/.+/).reply(400, {message: 'There\'s a problem'});

		const expected = {
			type: ADD_ERROR,
			error: expect.anything()
		};

		return store.dispatch(authUser('signin', {}))
			.then(() => {
				const actions = store.getActions();
				expect(actions[0]).toEqual(expected);
			});
	})
});