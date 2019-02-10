const manageLocalStorage = (data) => {

	if(data && data.token !== undefined) {
		const {token} = data;
		window.localStorage.setItem('jwtToken', token);
		debugger;
	}

	else {
		debugger;
		window.localStorage.clear();
	}

	return {...data};
};

export default manageLocalStorage;

