import axios from 'axios';
import moxios from 'moxios';
import authResponseMock from '../__mocks__/authResponseMock';
import manageAxiosHeaders from '../manageAxiosHeaders';

jest.mock('axios');

describe('When an object containing a token is passed to manageAxiosHeaders', () => {

	it('returns a copy of passed object', () => {
		const result = manageAxiosHeaders(authResponseMock);
		expect(result).toEqual(authResponseMock);
		expect(result).not.toBe(authResponseMock);
	});

	it('sets a Bearer Authorization header', () => {
		expect(axios.defaults.headers.common["Authorization"]).toEqual('Bearer ' + authResponseMock.token);
	});
});

describe('When a parameter without property "token" is passed to manageAxiosHeaders', () => {

	it('returns a copy of passed object', () => {
		const expected = {
			prop1: 'no token'
		};
		const result = manageAxiosHeaders(expected);
		expect(result).toEqual(expected);
		expect(result).not.toBe(expected);
	});

	it('clears Bearer Authorization header', () => {
		expect(axios.defaults.headers.common["Authorization"]).toEqual(undefined);
	});

});