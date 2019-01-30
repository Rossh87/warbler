import isStaleSelector from '../isStaleSelector'; 

// auth expiration will always be 20 secs ahead of current time in this
// fake state object

const fakeStateWithAuth = {
	currentUser: {
		isAuthenticated: true,
		isActive: true,
		authExp: (Math.floor(Date.now() / 1000) + 20).toString()
	}
}

const fakeStateNoAuth = {
	currentUser: {
		isAuthenticated: false,
		isActive: true,
		authExp: (Math.floor(Date.now() / 1000) + 20).toString()
	}
}

const fakeStateInactive = {
	currentUser: {
		isAuthenticated: true,
		isActive: false,
		authExp: (Math.floor(Date.now() / 1000) + 20).toString()
	}
}

let returned;

describe('The value returned by isStaleSelector', () => {
	it('is a function', () => {
		returned = isStaleSelector(fakeStateWithAuth, 10);
		expect(returned).toEqual(expect.any(Function));
	});

	describe('when user is authenticated and active', () => {
		it('returns true if difference between current time and expiration < window', () => {
			// specify that token is stale if less than 30 secs remain between current time and expiration
			// 20 secs will remain due to fakeState object expiration being constantly 20 secs ahead
			let result = isStaleSelector(fakeStateWithAuth, 30)();
			expect(result).toBe(true);
		});

		it('returns false if difference between current time and expiration > window', () => {
			// specify that token is stale if less than 10 secs remain between current time and expiration
			let result = isStaleSelector(fakeStateWithAuth, 10)();
			expect(result).toBe(false);
		});
	});

	describe('when user is inactive or unauthenticated', () => {
		it('returns false', () => {
			let noAuthResult = isStaleSelector(fakeStateNoAuth, 10)();
			let inactiveResult = isStaleSelector(fakeStateInactive, 10)();

			expect(noAuthResult).toBe(false);
			expect(inactiveResult).toBe(false);
		})
	})
});

