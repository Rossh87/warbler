import manageTokenExp from '../manageTokenExp';
import {authResponseWithImg} from '../../__mocks__/responseMocks';
import jwtDecode from 'jwt-decode';


describe('The function manageTokenExp', () => {
	let output;

	const fakeInput = {
		prop1: 'abc',
		prop2: '123'
	};

	const {token, ...passthrough} = authResponseWithImg

	const expected = {
		authExp: jwtDecode(token).exp,
		...passthrough
	};

	it('returns a copy of input param if param does not have property "token"', () => {
		output = manageTokenExp(fakeInput);
		expect(output).toEqual(fakeInput);
		expect(output).not.toBe(fakeInput);
	});

	it('replaces property "token" with decoded expiration', () => {
		output = manageTokenExp(authResponseWithImg);
		expect(output).toEqual(expected);
	});
});