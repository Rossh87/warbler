const isStaleSelector = (state, expWindow) => () => {
	const shouldProceed = (state.currentUser.isAuthenticated && state.currentUser.isActive);

	if(shouldProceed) {
		const current = Math.floor(Date.now() / 1000);
		const exp = parseInt(state.currentUser.authExp, 10);
		return (exp - current < expWindow);
	}

	return false;
};

export default isStaleSelector;