import React from 'react';
import Homepage from '../Homepage';
import {shallow} from 'enzyme';

const fakeProps = {
	currentUser: {
		profileImageUrl: 'some.img',
		username: 'someUser',
		isAuthenticated: true
	},

	otherProps: {
		string: 'string',
		data: () => 'data'
	}
};

let component;

describe('When current user is authenticated', () => {

	beforeEach(() => {
		component = shallow(<Homepage {...fakeProps} />);
	});

	it('renders the component <MessageTimeline />', () => {
		expect(component.find('MessageTimeline').length).toBe(1);
	});

	it('passes correct props to <MessageTimeline />', () => {
		const expectedShape = {
			profileImageUrl: 'some.img',
			username: 'someUser'
		};

		expect(component.find('MessageTimeline').props()).toEqual(expectedShape);
	});

	it('does not render hero div', () => {
		expect(component.find('.home-hero').length).toBe(0);
	});
});

describe('When current user is not authenticated', () => {

	beforeEach(() => {
		component = shallow(<Homepage {...fakeProps} currentUser={{isAuthenticated: false}} />)
	});

	it('renders hero div', () => {
		expect(component.find('.home-hero').length).toBe(1);
	});

	it('does not render <MessageTimeline />', () => {
		expect(component.find('MessageTimeline').length).toBe(0);
	})
})

