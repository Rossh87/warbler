import React from 'react';

// Get mocks
import mockStore, {mockMessages} from '../../../../__mocks__/storeMock.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Get local function(s)/helpers
import fetchMessages from '../fetchMessages';
import {LOAD_MESSAGES, ADD_ERROR} from '../../../actionTypes';


const store = mockStore({messages: mockMessages});
const api = new MockAdapter(axios, {delayResponse: 1000});

afterEach(() => {
	api.reset();
	store.clearActions();
});

describe('The async action creator fetchMessages', () => {
	it('dispatches api response with loadMessages', () => {
		api.onGet('/api/messages').reply(200, mockMessages);

		return store.dispatch(fetchMessages())
			.then(() => {
				const actions = store.getActions();
				expect(actions[0]).toEqual({
					type: LOAD_MESSAGES,
					messages: mockMessages
				});
			});
	});

	it('dispatches any errors', () => {
		api.onGet('/api/messages').networkError();

		return store.dispatch(fetchMessages())
			.then(() => {
				const actions = store.getActions();
				expect(actions[0]).toEqual({
					type: ADD_ERROR,
					error: expect.anything()
				});
			});
	});
})