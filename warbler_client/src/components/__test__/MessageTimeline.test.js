import React from 'react';
import MessageTimeline from '../MessageTimeline';
import MessageList from '../../containers/MessageList';
import {shallow} from 'enzyme';

let component = shallow( <MessageTimeline username={'user'} profileImageUrl={'someImg.img.com'} />);

describe('When component renders', () => {

	it('it renders the component UserAside', () => {
		expect(component.find('UserAside').length).toBe(1);
	});

	it('it renders the component MessageList', () => {
		expect(component.find('Connect(MessageList)').length).toBe(1);
	});

	it('it passes correct props to UserAside', () => {

		const expectedPropShape = {
			username: 'user',
			profileImageUrl: 'someImg.img.com'
		}

		expect(component.find('UserAside').props()).toEqual(expectedPropShape);
	});
});