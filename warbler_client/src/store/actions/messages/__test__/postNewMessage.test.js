import React from 'react';

// Get mocks
import mockStore, {mockUser} from '../../../../__mocks__/storeMock.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Get local function(s)/helpers
import postNewMessage from '../postNewMessage';
import {LOAD_MESSAGES, ADD_ERROR} from '../../../actionTypes';


const store = mockStore({currentUser: mockUser});
const api = new MockAdapter(axios, {delayResponse: 1000});
const mockText = 'This is meant to be a comment';

afterEach(() => {
	api.reset();
	store.clearActions();
});

describe('The async action creator postNewMessage', () => {
	it('calls axios with the correct url', () => {
		api.onPost().reply(200);

		return store.dispatch(postNewMessage(mockText))
			.then(() => {
				expect(api.history.post[0].url).toBe('/api/users/1/messages');
			});
	});

	it('dispatches any errors', () => {
		api.onAny().networkError();

		return store.dispatch(postNewMessage(mockText))
			.then(() => {
				const actions = store.getActions();
				expect(actions[0]).toEqual({
					type: ADD_ERROR,
					error: expect.anything()
				});
			});
	});
})
