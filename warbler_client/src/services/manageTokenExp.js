import jwtDecode from 'jwt-decode';

const manageTokenExp = (data) => {
	if(data && data.token !== undefined) {
		debugger;
		const {token, ...passThrough} = data;
		const {exp} = jwtDecode(token);
		return {...passThrough, authExp: exp}
	};

	return {...data};
};

export default manageTokenExp;