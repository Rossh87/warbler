import React from 'react';
import {shallow} from 'enzyme';

// Get local helper functions
import manageAuthResponse from '../../../../services/manageAuthResponse';

// Get mocks
import mockStore from '../../../../__mocks__/storeMock';

// Get function and needed action types
import logout from '../logout';
import {LOGOUT_CURRENT_USER} from '../../../actionTypes';

jest.mock('../../../../services/manageAuthResponse');

const store = new mockStore({});

beforeEach(() => {
	store.dispatch(logout());
});

afterEach(() => {
	store.clearActions();
});

describe('The action creator logout', () => {
	const expected = {
		type: LOGOUT_CURRENT_USER
	};

	it('calls manageAuthResponse', () => {
		expect(manageAuthResponse).toHaveBeenCalled();
	});

	it('dispatches action of correct type', () => {
		const actions = store.getActions();
		expect(actions[0]).toEqual(expected);
	})
});

