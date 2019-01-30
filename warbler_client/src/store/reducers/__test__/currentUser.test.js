import React from 'react';

// Get local function(s)/helpers
import {setAuthExpiration, setCurrentUser, setActiveUser} from '../../actions/auth/authActionCreators';
import currentUser from '../currentUser';

// Get mock user object
import {mockUserWithAuthExp as mockUser} from '../../../__mocks__/responseMocks.js';

const DEFAULT_STATE = {
	isAuthenticated: false,
	isActive: true
};

let prevState;

afterEach(() => prevState = DEFAULT_STATE);

describe('The reducer currentUser', () => {
	it('returns correct new state for actions of type SET_CURRENT_USER', () => {
		const expected = {
			...DEFAULT_STATE,
			isAuthenticated: true,
			...mockUser
		};

		expect(currentUser(DEFAULT_STATE, setCurrentUser(mockUser))).toEqual(expected);
	});

	it('returns correct new state for actions of type SET_ACTIVE_USER', () => {
		const expected = {
			...DEFAULT_STATE,
			isActive: false
		};

		expect(currentUser(DEFAULT_STATE, setActiveUser(false))).toEqual(expected);
	});

	it('returns correct new state for actions of type SET_AUTH_EXPIRATION', () => {
		const authExp = mockUser.authExp

		const expected = {
			...DEFAULT_STATE,
			authExp
		};

		expect(currentUser(DEFAULT_STATE, setAuthExpiration(authExp))).toEqual(expected);
	});

	it('returns correct new state for actions of type LOGOUT_CURRENT_USER', () => {
		const prevState = {
			...DEFAULT_STATE,
			...mockUser
		};

		const expected = DEFAULT_STATE;

		expect(currentUser(prevState, {type: 'LOGOUT_CURRENT_USER'})).toEqual(expected);
	})

	it('returns existing state for unmatched action types', () => {
		const prevState = {
			...DEFAULT_STATE,
			...mockUser
		};

		const UNKNOWN_ACTION = {
			type: 'UNKNOWN_TYPE',
			action: {data:'someData'}
		};

		expect(currentUser(prevState, UNKNOWN_ACTION)).toEqual(prevState);
	});
});