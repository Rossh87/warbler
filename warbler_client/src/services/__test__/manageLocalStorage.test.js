import manageLocalStorage from '../manageLocalStorage';
import '../../__mocks__/localStorageMock';
import authResponseMock from '../__mocks__/authResponseMock';

beforeEach(() => {
	manageLocalStorage(authResponseMock);
});

afterEach(() => {
	localStorage.clear();
});

describe('When manageLocalStorage is called with an object as parameter', () => {

	it('creates prop jwtToken on localStorage if object has property "token"', () => {
		expect(localStorage.getItem('jwtToken')).toEqual(authResponseMock.token);
	});

	it('returns a new object equal to the passed param', () => {
		const expectedVal = manageLocalStorage(authResponseMock);
		expect(expectedVal).toEqual(authResponseMock);
		expect(expectedVal).not.toBe(authResponseMock);
	});

	it('calls localStorage.clear if passed param does not have property "token"', () => {
		manageLocalStorage('someStringNoToken');
		expect(localStorage.getItem('jwtToken')).toBe(null);
	});
});

describe('When manageLocalStorage is called without params', () => {

	it('calls localStorage.clear', () => {
		manageLocalStorage();
		expect(localStorage.getItem('jwtToken')).toBe(null);
	});

});

	

	


