import React from 'react';
import {Route} from 'react-router-dom';
import {Main} from '../Main';
import {shallow} from 'enzyme';

const fakeProps = {
	authUser: jest.fn(),
	error: {},
	removeError: jest.fn(),
	currentUser: {
		isAuthenticated: true,
		isActive: true
	},
	refreshAuthToken: jest.fn(x => {console.log('refresh')}),
	tokenIsStale: jest.fn(x => true)
};

let component;

beforeEach(() => {
	jest.useFakeTimers();
	component = shallow(<Main {...fakeProps}/>);
});

afterEach(() => {
	jest.clearAllMocks().clearAllTimers();
});


// Calls compDM correctly
describe('When Main mounts', () => {
	it('calls setInterval', () => {
		expect(setInterval).toHaveBeenCalled();
	});

	describe('and tokenIsStale returns true (due to token expiration)', () => {

		it('tries to refresh token', () => {
			expect(fakeProps.refreshAuthToken).not.toHaveBeenCalled();
			jest.runTimersToTime(30000);
			expect(fakeProps.refreshAuthToken).toHaveBeenCalledTimes(1);
			jest.runTimersToTime(30000);
			expect(fakeProps.refreshAuthToken).toHaveBeenCalledTimes(2);
		});

		
	});

	describe('and tokenIsStale returns false (due to token age or auth/activity status)', () => {
		it('does not try to refresh token', () => {
			const freshSpy = jest.fn();
			let component = shallow(<Main {...fakeProps} refreshAuthToken={freshSpy} tokenIsStale={jest.fn(() => false)}/>);
			expect(freshSpy).not.toHaveBeenCalled();
			jest.runTimersToTime(39000);
			expect(freshSpy).not.toHaveBeenCalled();
		});
		
	});
});


