import React from 'react';
import {shallow} from 'enzyme';
import MessageItem from '../MessageItem';

const fakeProps = {
	date: 'Jan 1 2017',
	profileImageUrl: 'img.img.com',
	text: 'some message',
	username: 'some user',
	deleteMessage: jest.fn(),
	isMessageOwner: true
};

let component;

beforeEach(() => {
	component = shallow(<MessageItem {...fakeProps} />);
})

describe('When the component renders', () => {
	it('supplies a default image src if(!(props.profileImageUrl))', () => {
		component = shallow(<MessageItem {...fakeProps} profileImageUrl={''} />);
		expect(component.find('a').prop('src')).not.toEqual('');
	});
});

describe('When user is message owner', () => {
	it('renders a delete button', () => {
		expect(component.findWhere(el => el.prop('onClick') === fakeProps.deleteMessage).length).toBe(1);
	});
});

describe('When user is not message owner', () => {
	it('does not render a delete button', () => {
		component = shallow(<MessageItem {...fakeProps} isMessageOwner={false} />);
		expect(component.findWhere(el => el.prop('onClick') === fakeProps.deleteMessage).length).toBe(0);
	});
});

describe('When delete button is clicked', () => {
	it('calls function on props.deleteMessage', () => {
		component.findWhere(el => el.prop('onClick') === fakeProps.deleteMessage).simulate('click');
		expect(fakeProps.deleteMessage).toHaveBeenCalledTimes(1);
	});
})



