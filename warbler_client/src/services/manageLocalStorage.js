const manageLocalStorage = (data) => {

	if(data && data.token !== undefined) {
		const {token} = data;
		localStorage.setItem('jwtToken', token);
	}

	else {
		localStorage.clear();
	}

	return {...data};
};

export default manageLocalStorage;

