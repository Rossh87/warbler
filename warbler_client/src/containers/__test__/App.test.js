import React from 'react';
import {shallow} from 'enzyme';

// import unconnected component for unit testing
import {App} from '../App';

// get data and environment mocks
import '../../__mocks__/localStorageMock';
import authResponseMock from '../../__mocks__/authResponseMock';
import manageAxiosHeaders from '../../services/manageAxiosHeaders';
import jwtDecode from 'jwt-decode';

const fakeProps = {
	currentUser: {
		name: 'name',
		data: 'data'
	},
	setCurrentUser: jest.fn(),
	logout: jest.fn(),
	setActiveUser: jest.fn()
};

jest.mock('../../services/manageAxiosHeaders');

let component;

beforeEach(() => {
	component = shallow(<App {...fakeProps} />);
});

describe('When App renders', () => {
	it('renders a <Navbar> component with correct props', () => {
		const nav = component.find('Navbar');
		expect(nav.length).toBe(1);
		expect(nav.props()).toEqual({
			currentUser: fakeProps.currentUser,
			logout: fakeProps.logout
		});
	});

	it('renders component <Main>', () => {
		expect(component.find('withRouter(Connect(Main))').length).toBe(1);
	});
});

describe('When App mounts', () => {
	it('calls function checkForToken via componentDidMount', () => {
		const checkToken = component.instance().checkForToken = jest.fn();
		component.instance().componentDidMount()
		expect(checkToken).toHaveBeenCalledTimes(1);
	});

	describe('and there is a token in localStorage', () => {
		beforeEach(() => {
			localStorage.setItem('jwtToken', authResponseMock.token);
		});

		afterEach(() => {
			localStorage.clear();
		});

		it('calls manageAxiosHeaders with correct param', () => {
			const expected = {token: authResponseMock.token};
			component.instance().componentDidMount()
			expect(manageAxiosHeaders).toHaveBeenCalledWith(expected);
		});

		it('calls setCurrentUser with correct param', () => {
			const expected = jwtDecode(authResponseMock.token);
			expect(fakeProps.setCurrentUser).toHaveBeenCalledWith(expected);
		});

		it('calls setCurrentUser with empty object if decoding error', () => {
			const badToken = 'not a token';
			localStorage.setItem('jwtToken', badToken);
			component.instance().componentDidMount()
			expect(fakeProps.setCurrentUser).toHaveBeenCalledWith({});
		})
	})
})