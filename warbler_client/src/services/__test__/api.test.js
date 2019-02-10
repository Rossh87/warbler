import axios from 'axios';
import moxios from 'moxios';

// Get mock data
import {authResponseWithImg} from '../../__mocks__/responseMocks';

// Get local functions(s)/helpers
import apiCall from '../api';

const fakeService = (response) => {
	return new Promise((resolve, reject) => {
		setTimeOut(() => resolve(response), 1000)
	});
};

beforeEach(() => {
	moxios.install();
});

afterEach(() => {
	moxios.uninstall();
});

describe('When apiCall is called', () => {

	it('calls axios with correct parameters', (done) => {
		apiCall('get', '/api/auth', {fakeData: 'somedata'});

		moxios.wait(() => {
			let request = moxios.requests.mostRecent()
			expect(request.config.method).toEqual('get');
			expect(request.url).toEqual('/api/auth');
			expect(request.config.fakeData).toEqual('somedata')
			done();
		});
	});
});