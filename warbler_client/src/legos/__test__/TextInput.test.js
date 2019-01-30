import React from 'react';
import {shallow} from 'enzyme';
import TextInput from '../TextInput';

let component;

const fakeProps = {
	inputName: 'username',
	handleChange: jest.fn()
};

describe('When input value changes', () => {
	beforeEach(() => {
		component = shallow(<TextInput {...fakeProps} />);
	});

	it('calls change handler passed from props', () => {
		component.find('input').simulate('change');
		expect(fakeProps.handleChange).toHaveBeenCalled();
	});
})