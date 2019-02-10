import manageAuthResponse from '../manageAuthResponse';

import {authResponseWithImg} from '../../__mocks__/responseMocks';
import '../../__mocks__/localStorageMock'

const output = manageAuthResponse(authResponseWithImg);

describe('manageAuthResponse', () => {
	it('outputs correct user object', () => {
		console.log(output)
	})
})