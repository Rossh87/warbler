import React from 'react';
import {shallow} from 'enzyme';
import jwtDecode from 'jwt-decode';

// Get mocks
import mockStore from '../../../../__mocks__/storeMock.js';
import {authResponseWithImg} from '../../../../__mocks__/responseMocks.js';
import '../../../../__mocks__/localStorageMock.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Get needed local function(s) and variable;
import refreshAuthToken from '../refreshAuthToken';
import {SET_AUTH_EXPIRATION, ADD_ERROR} from '../../../actionTypes';

const store = mockStore({});

const api = new MockAdapter(axios, {delayResponse: 1000});

const fakeTokenResponseObj = {
	token: authResponseWithImg.token
};

afterEach(() => {
	store.clearActions();
	api.reset();
});

describe('The action creator refreshAuthToken', () => {

	it('dispatches correct action type with fresh token from api', () => {
		api.onAny(/\/api\/auth\/.*/).reply(200, fakeTokenResponseObj);

		const expected = {
			type: SET_AUTH_EXPIRATION,
			authExp: jwtDecode(fakeTokenResponseObj.token).exp
		};

		return store.dispatch(refreshAuthToken())
			.then(() => {
				const actions = store.getActions();
				expect(actions[0]).toEqual(expected);
			});
	});

	it('dispatches any errors', () => {
		api.onAny(/\/api\/auth\/.*/).reply(400, fakeTokenResponseObj);

		const expected = {
			type: ADD_ERROR,
			error: expect.anything()
		};

		return store.dispatch(refreshAuthToken())
			.then(() => {
				const actions = store.getActions();
				expect(actions[0]).toEqual(expected);
			})
	});

});
