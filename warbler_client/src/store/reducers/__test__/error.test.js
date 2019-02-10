import React from 'react';

// Get local function(s)/helpers
import {addError, removeError} from '../../actions/errorActionCreators';
import errorReducer from '../error';

const mockError = {
	name: 'MOCK_ERROR',
	message: 'There has been an error',
	signInRequired: true
};

let prevState;

afterEach(() => prevState = {});

describe('The reducer for errors', () => {
	it('returns correct new state for actions of type ADD_ERROR', () => {
		const expected = {
			...prevState,
			...mockError
		};

		expect(errorReducer(prevState, addError(mockError))).toEqual(expected);
	});

	it('returns correct new state for actions of type REMOVE_ERROR', () => {
		prevState = errorReducer(prevState, addError(mockError));

		expect(errorReducer(prevState, removeError())).toEqual({});
	});

	it('returns existing state for unmatched action types', () => {
		prevState = errorReducer(prevState, addError(mockError));

		const UNKNOWN_ACTION = {
			type: 'UNKNOWN_TYPE',
			action: {data:'someData'}
		};

		expect(errorReducer(prevState, UNKNOWN_ACTION)).toEqual(prevState);
	});
});