import React from 'react';
import AuthForm from '../AuthForm';
import {shallow} from 'enzyme';

const fakeSignup = {
	email: 'someMail', 
	username: 'someName', 
	password: 'somePW', 
	profileImageUrl: 'someUrl'
}

const fakeProps = {
	heading: 'heading here', 
	buttonText: 'text', 
	error: {
		message: 'There\'s an error, dumbshit'
	}, 
	removeError: jest.fn(), 
	history: {
		push: jest.fn(),
		listen: jest.fn()
	},
	authUser: jest.fn()
}

const fakeEvent = {
	preventDefault: jest.fn(),
	target: {
		name: 'testName',
		value: 'testVal'
	}
};

let component = shallow(<AuthForm {...fakeProps} signUp={true} />);

describe('When component renders', () => {
	it('calls history.listen', () => {
		expect(fakeProps.history.listen).toHaveBeenCalled;
	})
})

describe('When signUp is true', () => {

	beforeAll(() => {
		component = shallow(<AuthForm {...fakeProps} signUp={true} />);
	});

	it('displays <TextInput> 4 times', () => {
		expect(component.find('TextInput').length).toBe(4);
	})

	describe('When form is submitted', () => {
		beforeAll(() => {
			component.setState(fakeSignup);
			component.instance().handleSubmit(fakeEvent);
		});

		afterAll(() => {
			component = shallow(<AuthForm {...fakeProps} signUp={true} />);
		});

		it('calls authUser with correct params', () => {
			expect(fakeProps.authUser).toHaveBeenCalledWith('signUp', fakeSignup);
		});

		it('calls history.push to root route', () => {
			expect(fakeProps.history.push).toHaveBeenCalledWith('/');
		});
	});

});

describe('When signUp is false', () => {

	beforeAll(() => {
		component = shallow(<AuthForm {...fakeProps} signUp={false} />);
	});

	it('displays <TextInput> 2 times', () => {
		expect(component.find('TextInput').length).toBe(2);
	})

	describe('When form is submitted', () => {
		beforeAll(() => {
			component.setState(fakeSignup);
			component.instance().handleSubmit(fakeEvent);
		});

		afterAll(() => {
			component = shallow(<AuthForm {...fakeProps} signUp={true} />);
		});

		it('calls authUser with correct params', () => {
			expect(fakeProps.authUser).toHaveBeenCalledWith('signIn', fakeSignup);
		});
	});

});

describe('When there is an error message in props', () => {
	it('component shows a div with the error message as its content', () => {
		const foundDiv = component.find('.alert.alert-danger');
		expect(foundDiv.length).toBe(1);
		expect(foundDiv.text()).toBe('There\'s an error, dumbshit');
	})
});

describe('When input change handler is called', () => {
	afterAll(() => {
		component = shallow(<AuthForm {...fakeProps} signUp={true} />);
	});

	it('updates component state correctly', () => {
		component.instance().handleChange(fakeEvent);
		expect(component.state().testName).toBe('testVal');
	});
});



