import React from 'react';
import {shallow} from 'enzyme';

// Get mocks
import mockStore, {mockMessages} from '../../../../__mocks__/storeMock.js';
import {authResponseWithImg} from '../../../../__mocks__/responseMocks.js';
import '../../../../__mocks__/localStorageMock.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Get local function(s)/helpers
import deleteMessage from '../deleteMessage';
import {LOAD_MESSAGES, ADD_ERROR} from '../../../actionTypes';


const store = mockStore({messages: mockMessages});
const api = new MockAdapter(axios, {delayResponse: 1000});

afterEach(() => {
	api.reset();
	store.clearActions();
});

describe('The async action creator deleteMessage', () => {

	it('calls axios with the correct url and dispatches filtered message list', () => {
		api
			.onDelete('/api/users/1/messages/1').reply(200)
			// .onAny().reply(500)

		return store.dispatch(deleteMessage(1, 1))
			.then(() => {
				// ensure correct route was hit
				expect(api.history.delete.length).toBe(1);
				expect(api.history.delete[0].url).toBe('/api/users/1/messages/1');

				// verify filtered array was dispatched
				const actions = store.getActions();
				const filterMessages = (id) => mockMessages.filter(msg => msg._id !== id);
				expect(actions[0]).toEqual({
					type: LOAD_MESSAGES,
					messages: filterMessages(1)
				});
			})
	});

	it('dispatches any errors with correct action type', () => {
		api.onAny().reply(500);

		return store.dispatch(deleteMessage(1,1))
			.then(() => {
				const actions = store.getActions();
				expect(actions[0]).toEqual({
					type: ADD_ERROR,
					error: expect.anything()
				});
			});
	});
});