import axios from 'axios';
import {authResponseWithImg} from '../../__mocks__/responseMocks';
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

	it('returns a promise that resolves to response data', async (done) => {
		const dummy = (data) => {console.log(data)};

		moxios.stubRequest('/api/auth', {
			status: 200,
			data: authResponseWithImg
		});

		moxios.wait(() => {
			apiCall('get', '/api/auth', {fakeData: 'somedata'}).then(data => {
				console.log(data)
				expect(data).toEqual({data:'somedata'});
				done();
			});	
		}) 
	});
})