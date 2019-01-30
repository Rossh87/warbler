import React from 'react';
import Navbar from '../Navbar';
import {Link} from 'react-router-dom';

import {shallow} from 'enzyme';

let mountedNavbar;

const userIsAuthd = (bool) => ({
	isAuthenticated: bool,
	user: {
		id: 123
	}
});

const fakeLogout = jest.fn();

beforeEach(() => {
	mountedNavbar = shallow(<Navbar currentUser={userIsAuthd(true)} logout={fakeLogout} />)
})

describe('When the user is not authenticated', () => {

	it('renders 3 <Link>s', () => {
		mountedNavbar = shallow(<Navbar currentUser={userIsAuthd(false)} logout={fakeLogout} />)
		expect(mountedNavbar.find(Link).length).toEqual(3);
	});

})

describe('When user is authenticated', () => {

	it('renders 2 <Link>s', () => {
		expect(mountedNavbar.find(Link).length).toEqual(2);
	});

})

describe('When "logout" link is clicked', () => {

	it('calls the function on props.logout', () => {
		mountedNavbar.find('a').simulate('click');
		expect(fakeLogout).toHaveBeenCalled();
	});

})
