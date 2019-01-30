import React from 'react';

// Get local function(s)/helpers
import {addError, removeError} from '../../actions/errorActionCreators';
import errorReducer from '../error';

const DEFAULT_STATE = {
	message: null,
	signInRequired: false
};

const mockError = {
	name: 'MOCK_ERROR',
	message: 'There has been an error',
	signInRequired: true
};

let prevState = DEFAULT_STATE;

afterEach(() => prevState = DEFAULT_STATE);

describe('The reducer for errors', () => {
	it('returns correct new state for actions of type ADD_ERROR', () => {
		const expected = {
			...prevState,
			message: mockError.message,
			signInRequired: mockError.signInRequired
		};

		expect(errorReducer(prevState, addError(mockError))).toEqual(expected);
	});

	it('returns correct new state for actions of type REMOVE_ERROR', () => {
		prevState = errorReducer(DEFAULT_STATE, addError(mockError));

		const expected = {
			...prevState,
			message: null,
			signInRequired: false
		};

		expect(errorReducer(prevState, removeError())).toEqual(expected);
	});

	it('returns existing state for unmatched action types', () => {
		const prevState = errorReducer(DEFAULT_STATE, addError(mockError));

		const UNKNOWN_ACTION = {
			type: 'UNKNOWN_TYPE',
			action: {data:'someData'}
		};

		expect(errorReducer(prevState, UNKNOWN_ACTION)).toEqual(prevState);
	});
});