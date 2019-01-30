import React from 'react';

// Get local function(s)/helpers
import {loadMessages} from '../../actions/messages/messageActionCreators';
import messageReducer from '../messages';

// Get array of mock message objects
import {mockMessages} from '../../../__mocks__/storeMock.js';

const DEFAULT_STATE = [];

let prevState;

afterEach(() => prevState = DEFAULT_STATE);

describe('The reducer messageReducer', () => {
	it('returns correct new state for actions of type LOAD_MESSAGES', () => {
		const expected = mockMessages;
		expect(messageReducer(prevState, loadMessages(mockMessages))).toEqual(expected);
	});

	it('returns existing state for unmatched action types', () => {
		const UNKNOWN_ACTION = {
			type: 'UNKNOWN_TYPE',
			action: {data:'someData'}
		};

		expect(messageReducer(prevState, UNKNOWN_ACTION)).toEqual(prevState);
	});
});